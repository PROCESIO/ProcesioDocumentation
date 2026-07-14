#!/bin/bash
# Double-click to download PROCESIO doc images. Safe to re-run; skips existing files.
cd "$(dirname "$0")" || exit 1
MAN="scripts/asset-manifest.txt"
if [ ! -f "$MAN" ]; then echo "Cannot find $MAN — keep this file inside procesio-docs."; read -r _; exit 1; fi
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
REF="https://docs.procesio.com/"
total=$(grep -c . "$MAN"); i=0; ok=0; fail=0
: > scripts/download-failures.log
echo "Downloading $total images into public/ ..."
while IFS=$'\t' read -r url path; do
  [ -z "$url" ] && continue
  i=$((i+1)); mkdir -p "$(dirname "$path")"
  if [ -s "$path" ]; then ok=$((ok+1)); printf "\r%d/%d  ok=%d fail=%d" "$i" "$total" "$ok" "$fail"; continue; fi
  if curl -fsSL --max-time 60 --retry 3 --retry-delay 2 -A "$UA" -e "$REF" \
       -H "Accept: image/avif,image/webp,image/png,image/*,*/*;q=0.8" "$url" -o "$path"; then
    ok=$((ok+1))
  else
    fail=$((fail+1)); echo "$url" >> scripts/download-failures.log
  fi
  printf "\r%d/%d  ok=%d fail=%d" "$i" "$total" "$ok" "$fail"
done < "$MAN"
echo ""; echo "Done.  ok=$ok  failed=$fail"
[ "$fail" -gt 0 ] && echo "Remaining failures (likely deleted in Archbee) are in scripts/download-failures.log"
echo "You can close this window."
