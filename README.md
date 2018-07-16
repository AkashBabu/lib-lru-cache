# lib-lru-cache [![Build Status](https://travis-ci.com/AkashBabu/lib-lru-cache.svg?branch=master)](https://travis-ci.com/AkashBabu/lib-lru-cache) [![Maintainability](https://api.codeclimate.com/v1/badges/0ce521c11691565ee420/maintainability)](https://codeclimate.com/github/AkashBabu/lib-lru-cache/maintainability)
 

A blazing fast & light weight LRU Cache Implementation in nodejs.

## Installation
> npm i lib -S

## Methods
`new LRUCache(maxLimit = 100)`    
Creates an LRUCache with Max Limit in size equals to maxLimit. *defaults to 100*  
*Please note that you cannot use the LRUCache if the maxLimit is more than 100, as that might hog up a lot of RAM*

`set('name', 'test')`  
**(key, val)** Save key => val pair and if the maxLimit of the Cache has been exceeded, then the First-Used is removed.  
*Please note that if the same key is set twice, then the previously set value is over-ridden*

`get('name')`  
**(key)** Returns the value of the corresponding key if available, else return *null*

`reset()`  
Removes all the data in the LRUCache

## Usage 

```javascript
const cache = new LRUCache(2)
cache.set('name1', 'test1')
cache.set('name2', 'test2')
cache.set('name3', 'test3')

console.log(cache.get('name3')) // test3
console.log(cache.get('name2')) // test2
console.log(cache.get('name1')) // null

cache.reset()
console.log(cache.get('name3')) // null
```

## Test
> npm test

## Coverage
> npm run coverage

## Benchmark
> npm run benchmark

## Contributions
This is open-source, which makes it obvious for any PRs, but I would request you to add necessary test-cases for the same 
