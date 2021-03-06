//
// officegen: pptx basic tests
//
// Please put here all the pptx basic tests.
//
// Copyright (c) 2013 Ziv Barber;
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//

var assert = require('assert')
var officegen = require('../')
var fs = require('fs')
var path = require('path')

var outDir = path.join(__dirname, '../tmp/')

// Common error method:
var onError = function(err) {
  console.log(err)
  assert(false)
}

describe('PPTX generator', function() {
  this.slow(1000)

  before(function(done) {
    fs.mkdir(outDir, 0o777, function(err) {
      if (err) {
      } // Endif.

      done()
    })
  })

  it('creates a presentation with properties and text', function(done) {
    var pptx = officegen('pptx')
    pptx.on('error', onError)

    pptx.setDocTitle('Sample PPTX Document')

    var slide = pptx.makeNewSlide()

    slide.name = 'The first slide!'

    // Change the background color:
    slide.back = '000000'

    // Declare the default color to use on this slide:
    slide.color = 'ffffff'

    // Basic way to add text string:
    slide.addText(
      'Created using Officegen version ' + officegen.version,
      0,
      0,
      '80%',
      20
    )
    slide.addText('Fast position', 0, 20)
    slide.addText('Full line', 0, 40, '100%', 20)

    // Add text box with multi colors and fonts:
    slide.addText(
      [
        { text: 'Hello ', options: { font_size: 56 } },
        {
          text: 'World!',
          options: { font_size: 56, font_face: 'Arial', color: 'ffff00' }
        }
      ],
      { cx: '75%', cy: 66, y: 150 }
    )
    // Please note that you can pass object as the text parameter to addText.

    // For a single text just pass a text string to addText:
    slide.addText('Office generator', {
      y: 66,
      x: 'c',
      cx: '50%',
      cy: 60,
      font_size: 48,
      color: '0000ff'
    })

    var pObj = slide.addText('Big & Red\nText!', {
      y: 150,
      x: 10,
      cx: '70%',
      font_face: 'Wide Latin',
      font_size: 48,
      color: 'cc0000',
      bold: true,
      underline: true
    })

    pObj.options.y += 150

    var outFilename = 'test-ppt1.pptx'
    var out = fs.createWriteStream(path.join(outDir, outFilename))
    pptx.generate(out)
    out.on('close', function() {
      done()
    })
  })

  it('creates slides with shapes', function(done) {
    var pptx = officegen('pptx')
    pptx.on('error', onError)

    pptx.setDocTitle('Sample PPTX Document')
    pptx.setWidescreen(false)
    var slide = pptx.makeNewSlide()

    slide.show = false
    slide.addText('Red line', 'ff0000')
    slide.addShape(pptx.shapes.OVAL, {
      fill: { type: 'solid', color: 'ff0000', alpha: 50 },
      line: 'ffff00',
      y: 50,
      x: 50
    })
    slide.addText('Red box 1', {
      color: 'ffffff',
      fill: 'ff0000',
      line: 'ffff00',
      line_size: 5,
      y: 100,
      rotate: 45
    })
    slide.addShape(pptx.shapes.LINE, {
      line: '0000ff',
      y: 150,
      x: 150,
      cy: 0,
      cx: 300
    })
    slide.addShape(pptx.shapes.LINE, {
      line: '0000ff',
      y: 150,
      x: 150,
      cy: 100,
      cx: 0
    })
    slide.addShape(pptx.shapes.LINE, {
      line: '0000ff',
      y: 249,
      x: 150,
      cy: 0,
      cx: 300
    })
    slide.addShape(pptx.shapes.LINE, {
      line: '0000ff',
      y: 150,
      x: 449,
      cy: 100,
      cx: 0
    })
    slide.addShape(pptx.shapes.LINE, {
      line: '000088',
      y: 150,
      x: 150,
      cy: 100,
      cx: 300
    })
    slide.addShape(pptx.shapes.LINE, {
      line: '000088',
      y: 150,
      x: 150,
      cy: 100,
      cx: 300
    })
    slide.addShape(pptx.shapes.LINE, {
      line: '000088',
      y: 170,
      x: 150,
      cy: 100,
      cx: 300,
      line_head: 'triangle'
    })
    slide.addShape(pptx.shapes.LINE, {
      line: '000088',
      y: 190,
      x: 150,
      cy: 100,
      cx: 300,
      line_tail: 'triangle'
    })
    slide.addShape(pptx.shapes.LINE, {
      line: '000088',
      y: 210,
      x: 150,
      cy: 100,
      cx: 300,
      line_head: 'stealth',
      line_tail: 'stealth'
    })
    var pObj = slide.addShape(pptx.shapes.LINE)
    pObj.options.line = '008888'
    pObj.options.y = 210
    pObj.options.x = 150
    pObj.options.cy = 100
    pObj.options.cx = 300
    pObj.options.line_head = 'stealth'
    pObj.options.line_tail = 'stealth'
    pObj.options.flip_vertical = true
    slide.addText('Red box 2', {
      color: 'ffffff',
      fill: 'ff0000',
      line: 'ffff00',
      y: 350,
      x: 200,
      shape: pptx.shapes.ROUNDED_RECTANGLE,
      indentLevel: 1
    })

    var outFilename = 'test-ppt2.pptx'
    var out = fs.createWriteStream(path.join(outDir, outFilename))
    pptx.generate(out)
    out.on('close', function() {
      done()
    })
  })

  it('creates presentation to widescreen', function(done) {
    var pptx = officegen('pptx')
    pptx.on('error', onError)

    pptx.setDocTitle('Sample PPTX Document')
    pptx.setWidescreen(true)
    var slide = pptx.makeNewSlide()

    slide.show = false
    slide.addText('Red line', 'ff0000')
    slide.addShape(pptx.shapes.OVAL, {
      fill: { type: 'solid', color: 'ff0000', alpha: 50 },
      line: 'ffff00',
      y: 50,
      x: 50
    })
    slide.addText('Red box 1', {
      color: 'ffffff',
      fill: 'ff0000',
      line: 'ffff00',
      line_size: 5,
      y: 100,
      rotate: 45
    })
    slide.addShape(pptx.shapes.LINE, {
      line: '0000ff',
      y: 150,
      x: 150,
      cy: 0,
      cx: 300
    })
    slide.addShape(pptx.shapes.LINE, {
      line: '0000ff',
      y: 150,
      x: 150,
      cy: 100,
      cx: 0
    })
    slide.addShape(pptx.shapes.LINE, {
      line: '0000ff',
      y: 249,
      x: 150,
      cy: 0,
      cx: 300
    })
    slide.addShape(pptx.shapes.LINE, {
      line: '0000ff',
      y: 150,
      x: 449,
      cy: 100,
      cx: 0
    })
    slide.addShape(pptx.shapes.LINE, {
      line: '000088',
      y: 150,
      x: 150,
      cy: 100,
      cx: 300
    })
    slide.addShape(pptx.shapes.LINE, {
      line: '000088',
      y: 150,
      x: 150,
      cy: 100,
      cx: 300
    })
    slide.addShape(pptx.shapes.LINE, {
      line: '000088',
      y: 170,
      x: 150,
      cy: 100,
      cx: 300,
      line_head: 'triangle'
    })
    slide.addShape(pptx.shapes.LINE, {
      line: '000088',
      y: 190,
      x: 150,
      cy: 100,
      cx: 300,
      line_tail: 'triangle'
    })
    slide.addShape(pptx.shapes.LINE, {
      line: '000088',
      y: 210,
      x: 150,
      cy: 100,
      cx: 300,
      line_head: 'stealth',
      line_tail: 'stealth'
    })

    var pObj = slide.addShape(pptx.shapes.LINE)
    pObj.options.line = '008888'
    pObj.options.y = 210
    pObj.options.x = 150
    pObj.options.cy = 100
    pObj.options.cx = 300
    pObj.options.line_head = 'stealth'
    pObj.options.line_tail = 'stealth'
    pObj.options.flip_vertical = true
    slide.addText('Red box 2', {
      color: 'ffffff',
      fill: 'ff0000',
      line: 'ffff00',
      y: 350,
      x: 200,
      shape: pptx.shapes.ROUNDED_RECTANGLE,
      indentLevel: 1
    })

    var outFilename = 'test-ppt3.pptx'
    var out = fs.createWriteStream(path.join(outDir, outFilename))
    pptx.generate(out)
    out.on('close', function() {
      done()
    })
  })

  it('creates slides with images', function(done) {
    var pptx = officegen('pptx')
    pptx.on('error', onError)

    pptx.setDocTitle('Sample PPTX Document')
    var dirImages = path.join(__dirname, '/../examples/')
    var slide = pptx.makeNewSlide()

    slide.addImage(path.resolve(dirImages, 'images_for_examples/image1.png'), {
      y: 'c',
      x: 'c'
    })

    slide = pptx.makeNewSlide()

    slide.addImage(path.resolve(dirImages, 'images_for_examples/image2.jpg'), {
      y: 0,
      x: 0,
      cy: '100%',
      cx: '100%'
    })

    slide = pptx.makeNewSlide()
    slide.addImage(path.resolve(dirImages, 'images_for_examples/image3.png'), {
      y: 'c',
      x: 'c'
    })

    slide = pptx.makeNewSlide()

    slide.addImage(path.resolve(dirImages, 'images_for_examples/image2.jpg'), {
      y: 0,
      x: 0,
      cy: '100%',
      cx: '100%'
    })

    slide = pptx.makeNewSlide()

    slide.addImage(path.resolve(dirImages, 'images_for_examples/image2.jpg'), {
      y: 0,
      x: 0,
      cy: '100%',
      cx: '100%'
    })
    slide.addImage(
      path.resolve(dirImages, 'images_for_examples/sword_001.png'),
      { y: 10, x: 10 }
    )
    slide.addImage(
      path.resolve(dirImages, 'images_for_examples/sword_002.png'),
      { y: 10, x: 110 }
    )
    slide.addImage(
      path.resolve(dirImages, 'images_for_examples/sword_001.png'),
      { y: 110, x: 10 }
    )
    slide.addImage(
      path.resolve(dirImages, 'images_for_examples/sword_001.png'),
      { y: 110, x: 110 }
    )

    slide = pptx.makeNewSlide()

    slide.addImage(path.resolve(dirImages, 'images_for_examples/image2.jpg'), {
      y: 0,
      x: 0,
      cy: '100%',
      cx: '100%'
    })
    slide.addImage(
      path.resolve(dirImages, 'images_for_examples/sword_001.png'),
      { y: 10, x: 10 }
    )
    slide.addImage(
      path.resolve(dirImages, 'images_for_examples/sword_002.png'),
      110,
      10
    )
    slide.addImage(
      path.resolve(dirImages, 'images_for_examples/sword_003.png'),
      { y: 10, x: 210 }
    )
    slide.addImage(
      path.resolve(dirImages, 'images_for_examples/sword_004.png'),
      { y: 110, x: 10 }
    )
    slide.addImage(
      path.resolve(dirImages, 'images_for_examples/sword_001.png'),
      { y: 110, x: 110 }
    )
    slide.addImage(
      path.resolve(dirImages, 'images_for_examples/sword_003.png'),
      { y: 110, x: 210 }
    )
    slide.addImage(
      path.resolve(dirImages, 'images_for_examples/sword_002.png'),
      { y: 210, x: 10 }
    )
    slide.addImage(
      path.resolve(dirImages, 'images_for_examples/sword_004.png'),
      { y: 210, x: 110 }
    )
    slide.addImage(
      path.resolve(dirImages, 'images_for_examples/sword_004.png'),
      { y: 210, x: 210 }
    )
    slide.addImage(
      path.resolve(dirImages, 'images_for_examples/sword_004.png'),
      { y: '310', x: 10 }
    )
    slide.addImage(
      path.resolve(dirImages, 'images_for_examples/sword_002.png'),
      { y: 310, x: 110 }
    )
    slide.addImage(
      path.resolve(dirImages, 'images_for_examples/sword_003.png'),
      { y: 310, x: 210 }
    )

    var outFilename = 'test-ppt-images.pptx'
    var out = fs.createWriteStream(path.join(outDir, outFilename))
    pptx.generate(out)
    out.on('close', function() {
      done()
    })
  })

  it('creates a native table', function(done) {
    var pptx = officegen('pptx')
    pptx.on('error', onError)

    pptx.setDocTitle('Sample PPTX Document')
    var slide = pptx.makeNewSlide()

    var rows = []
    for (var i = 0; i < 12; i++) {
      var row = []
      for (var j = 0; j < 5; j++) {
        row.push('[' + i + ',' + j + ']')
      } // End of for loop.

      rows.push(row)
    } // End of for loop.

    slide.addTable(rows, {})

    var outFilename = 'test-ppt-table-1.pptx'
    var out = fs.createWriteStream(path.join(outDir, outFilename))
    pptx.generate(out)
    out.on('close', function() {
      done()
    })
  })
})
