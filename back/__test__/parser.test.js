const parser = require('../parser')
const testData = './__test__/test.data'

// Test that parser returns an array
test('Parser returns an array', () => {
    parser(testData)
        .then(data => expect(Array.isArray(data)).toBeTruthy())
});

// Test that parser returns x number of packages
// test.data contains 20 packages
test('Parser returns correct amount of packages', () => {
    parser(testData)
        .then(data => expect(data.length).toEqual(20))
});

// Test that every item returned icludes 'Package' property
test('Parser returns Package property for every package', () => {
    parser(testData)
        .then(data => data.forEach(pkg => expect(pkg.hasOwnProperty('Package')).toBeTruthy()))
})

const expectedArray = ['libxdmcp6', 'bsh-gcj', 'libnl-3-200', 'sudo', 'libfreetype6', 'libxcb-shm0', 'libxmuu1', 'python-twisted-bin', 'libxml2', 'telnet']

// Test that parser returns expected reverse-dependencies
test('Parser returns expected reverse-depencecies', () =>
    parser(testData)
        .then(data => data.forEach(pkg => {
            if (pkg['Package'] === 'libc6') {
                expect(pkg['Reverse-dependencies']).toEqual(expectedArray)
            }
        }
        ))
)

// Test that dependendencies doesn't include version numbers
test('Parser cuts version numbers', () =>
    parser(testData)
        .then(data => data.forEach(pkg => {
            if (pkg['Depends']) {
                pkg['Depends'].forEach(dep => expect(dep).not.toMatch('\([^)]*\)'))
            }
        }
        ))
)