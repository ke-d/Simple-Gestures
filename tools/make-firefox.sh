echo "Building Directory"

DES=dist/build/SimpleGestures
rm -rf $DES
mkdir -p $DES/webextension

git clone https://github.com/mrdokenny/Simple-Gestures.git

zip ../$(basename $DES).xpi -qr *

echo "Package done."