/**
* Copyright 2016 Signal K <info@signalk.org> and contributors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

const Parser = require('../lib')
const chai = require('chai')
const nmeaLine = "$GPZDA,160012.71,11,03,2004,-1,00*7D"
const emptyNmeaLine = "$GPZDA,,,,,,*48"

chai.Should()
chai.use(require('chai-things'))

describe('ZDA', () => {

  it('Converts OK using individual parser', done => {
    const parser = new Parser

    parser
    .on('signalk:delta', delta => {
      delta.updates[0].values.should.contain.an.item.with.property('path', 'navigation.datetime')
      delta.updates[0].values.should.contain.an.item.with.property('value', '2004-03-11T16:00:12.710Z')
      done()
    })
    .parse(nmeaLine)
  })
  
  /*it('Converts OK using stream parser', done => {
    const parser = new Parser
    const stream = parser.stream()
    stream
    .on('data', result => {
      result.should.be.an.object
      result.should.have.property('delta')
      delta.updates[0].values.should.contain.an.item.with.property('path', 'navigation.datetime')
      delta.updates[0].values.should.contain.an.item.with.property('value', '2004-03-11T16:00:12.710Z')
      done()
    })
    .write(nmeaLine)
  })
  
  it('Doesn\'t choke on empty sentences', done => {
    new Parser()
    .parse(emptyNmeaLine)
    .then(result => {
      should.equal(result, null)
      done()
    })
    //.catch(e => done(e))
  })*/
  
})
