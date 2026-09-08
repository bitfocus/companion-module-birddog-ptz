import assert from 'node:assert/strict'
import test from 'node:test'

import { parseCompactPanTiltPosition, parseCompactZoomPosition } from '../utils.js'

test('parses the compact pan and tilt reply sent by a BirdDog P100', () => {
	const reply = Buffer.from('0111000b0000000190500f07020600010704ff', 'hex')

	assert.deepEqual(parseCompactPanTiltPosition(reply), {
		pan: 'f726',
		tilt: '0174',
	})
})

test('does not mistake a malformed or unrelated VISCA reply for a compact position', () => {
	assert.equal(parseCompactPanTiltPosition(Buffer.alloc(19)), undefined)

	const nonNibblePosition = Buffer.from('0111000b0000000190501007020600010704ff', 'hex')
	assert.equal(parseCompactPanTiltPosition(nonNibblePosition), undefined)
})

test('parses zoom position replies supplied by the P100 owner', () => {
	const replies = [
		['0111000700000001905004000000ff', '4000'],
		['0111000700000001905000000000ff', '0000'],
		['011100070000000190500106000eff', '160e'],
		['0111000700000001905001030b06ff', '13b6'],
	]

	for (const [packet, expected] of replies) {
		assert.equal(parseCompactZoomPosition(Buffer.from(packet, 'hex')), expected)
	}
})

test('rejects malformed zoom position replies', () => {
	assert.equal(parseCompactZoomPosition(Buffer.alloc(15)), undefined)
	assert.equal(parseCompactZoomPosition(Buffer.from('0111000700000001905010000000ff', 'hex')), undefined)
})
