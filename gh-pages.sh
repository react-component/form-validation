npm run less
npm run example
cd ../form-validation-gh-pages
rm -rf build/
mkdir build
cp -r ../form-validation/build/ build
git add --all
git commit -am "update examples"
git push origin gh-pages:gh-pages