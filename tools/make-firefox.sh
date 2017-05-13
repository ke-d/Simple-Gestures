echo "Building Directory"

git clone https://github.com/mrdokenny/Simple-Gestures.git

cd Simple-Gestures/

zip test.xpi src/

cd

rm -r Simple-Gestures/

echo "Package done."