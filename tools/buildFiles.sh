echo "Building"

DES=builds
rmdir -rf $DES
mkdir -p $DES
cd src/

zip -r Firefox.zip *


sed -i '/applications/,+5d' manifest.json
zip -r Chrome.zip *


mv Firefox.zip ../$DES/
mv Chrome.zip ../$DES/

git checkout manifest.json

echo "Package done."