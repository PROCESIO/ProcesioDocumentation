#!/bin/bash
# Double-click to download all PROCESIO doc images into the site.
# Run this on a machine while your Archbee account is still active.
cd "$(dirname "$0")/.." || exit 1
MAN="scripts/asset-manifest.txt"
total=$(wc -l < "$MAN" | tr -d ' '); i=0; ok=0; fail=0
echo "Downloading $total assets..."
while IFS=$'\t' read -r url path; do
  [ -z "$url" ] && continue
  i=$((i+1))
  mkdir -p "$(dirname "$path")"
  if [ -f "$path" ]; then ok=$((ok+1)); continue; fi
  if curl -fsSL --max-time 60 "$url" -o "$path"; then ok=$((ok+1)); else fail=$((fail+1)); echo "FAILED: $url" >> scripts/download-failures.log; fi
  printf "\r%d/%d  ok=%d fail=%d" "$i" "$total" "$ok" "$fail"
done < "$MAN"
echo ""; echo "Done. ok=$ok fail=$fail"
[ "$fail" -gt 0 ] && echo "See scripts/download-failures.log for any that failed."
