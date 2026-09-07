import assert from 'node:assert/strict'
import test from 'node:test'

import { parseCompactPanTiltPosition } from '../utils.js'

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
