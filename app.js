const fs = require('fs');
const readline = require('readline');
const express = require('express');
const app = express();
const path = require('path');
const filePath = '/var/lib/dpkg/status'

const file = fs.existsSync(filePath) ? filePath : 'status.real'
let packageList = [{}];
let packages;
let i = 0

const port = process.env.PORT || 4000;

const newLine = RegExp(/^\s/);
const newProperty = RegExp(/(^\b[a-zA-Z-]+\b:)/)
const versionNumber = RegExp(/ *\([^)]*\) */g)

// line reader stream
const lineReader = readline.createInterface({
  input: fs.createReadStream(file)
});

// new line event
lineReader.on('line', (line) => {

  // add new property to object
  if (newProperty.test(line)) {

    // if !object for current i add new
    if (!packageList[i]) packageList.push({})

    let a = line.split(newProperty)
    a.shift()
    packageList[i][a[0].slice(0, -1)] = a[1].slice(1)
  }

  // add new line to last property item
  if (newLine.test(line)) {

    // cut whitespace and add newline
    const cleanLine = `\n${line.slice(1)}`
    packageList[i][Object.keys(packageList[i])[Object.keys(packageList[i]).length - 1]] += cleanLine
  }

  if (line.length <= 0) i++

});

const reverseDependencies = (packageList) => {
  let reversed = []

  const packages = packageList.map(pkg => {
    packageList.forEach(otherPkg => {
      if (otherPkg['Package'] === pkg['Package'] || !otherPkg['Depends']) return

      if (otherPkg['Depends'].includes(pkg['Package'])) {
        reversed.push(otherPkg['Package'])
      }
    })

    if (reversed.length > 0) {
      pkg['Reverse-dependencies'] = reversed
      reversed = []
      return pkg
    }
    else return pkg
  })
  return packages
}

// dependencies string to array
const separateDependecies = (dependencies) => {
  if (!dependencies) return
  dependencies = dependencies.replace(/\s+/g, '').split(/[|,]/)

  // remove dublicate dependencies
  return [...new Set(dependencies)]
}

const cutVersionNumbers = (dependencies) => {
  if (!dependencies) return
  return dependencies.replace(versionNumber, "")
}

const handleDependencies = (packageList) => {
  const packages = packageList.map(package => {
    if (!package['Depends']) return package;

    package['Depends'] = cutVersionNumbers(package['Depends'])
    package['Depends'] = separateDependecies(package['Depends'])

    return package
  })
  const handledPackages = reverseDependencies(packages)
  return handledPackages
}

// end of lines event
lineReader.on('close', () => {
  packages = handleDependencies(packageList)
});

// api path
app.get('/api', (req, res) => {
  try {
    res.json(packages)
  }
  catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
});

// if build folder exist
if (fs.existsSync('./build')) {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('/', (res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'not found',
    message: `Can't find ${req.originalUrl}`
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
