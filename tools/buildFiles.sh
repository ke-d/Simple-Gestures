echo "Building"

DES=builds

mkdir -p $DES
cd src/
zip -r test.zip *
mv test.zip ../$DES/

echo "Package done."