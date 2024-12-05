async function createUser(apiKey, url, data) {
   const resp = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers:{
      'X-API-Key': apiKey,
      'Content-Type':  'application/json'
    },
    
    body: JSON.stringify(data)
   })
   return await resp.json();
}

// Test Suite Don't Touch Below This Line

const userToCreate = {
  role: 'Junior Developer',
  experience: 2,
  remote: true,
  user: {
    name: 'Dan',
    location: 'NOR',
    age: 29
  }
}

const generatedKey = generateKey()
const url = 'https://api.boot.dev/v1/courses_rest_api/learn-http/users'

async function getUsers(url, apiKey) {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'X-API-Key': apiKey
    }
  })
  return response.json()
}

function generateKey() {
  const characters = 'ABCDEF0123456789'
  let result = ''
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

function logUsers(users) {
  for (const user of users) {
    console.log(`User name: ${user.user.name}, Role: ${user.role}, experience: ${user.experience}, Remote: ${user.remote}`)
  }
}

console.log('Retrieving user data...')
const userDataFirst = await getUsers(url, generatedKey)
logUsers(userDataFirst)
console.log('---')

console.log('Creating new user account...')
const creationResponse = await createUser(generatedKey, url, userToCreate)
console.log(`Creation response body: ${JSON.stringify(creationResponse)}`)
console.log('---')


console.log('Retrieving user data...')
const userDataSecond = await getUsers(url, generatedKey)
logUsers(userDataSecond)
console.log('---')

