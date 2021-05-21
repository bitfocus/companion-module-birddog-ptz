var instance_skel = require('../../instance_skel');
var udp           = require('../../udp');
var debug;
var log;

var IRIS = [
	{ id: '17', label: 'F1.6 OPEN' },
	{ id: '16', label: 'F2.0' },
	{ id: '15', label: 'F2.4' },
	{ id: '14', label: 'F2.8' },
	{ id: '13', label: 'F3.4' },
	{ id: '12', label: 'F4.0' },
	{ id: '11', label: 'F4.8' },
	{ id: '10', label: 'F5.6' },
	{ id: '09', label: 'F6.8' },
	{ id: '08', label: 'F8.0' },
	{ id: '07', label: 'F9.6' },
	{ id: '06', label: 'F11.0' },
	{ id: '05', label: 'F14.0' },
	{ id: '00', label: 'CLOSED' },
];

var GAIN = [
	{ id: '15', label: '50.0 dB' },
	{ id: '14', label: '46.4 dB' },
	{ id: '13', label: '42.8 dB' },
	{ id: '12', label: '39.3 dB' },
	{ id: '11', label: '35.7 dB' },
	{ id: '10', label: '32.1 dB' },
	{ id: '9', label: '28.6 dB' },
	{ id: '8', label: '25.0 dB' },
	{ id: '7', label: '21.4 dB' },
	{ id: '6', label: '17.8 dB' },
	{ id: '5', label: '14.3 dB' },
	{ id: '4', label: '10.7 dB' },
	{ id: '3', label: '7.1 dB' },
	{ id: '2', label: '3.6 dB' },
	{ id: '1', label: '0 dB' }
];

var SHUTTER = [
	{ id: '21', label: '1/10000 | 1/10000' },
	{ id: '20', label: '1/6000 | 1/6000' },
	{ id: '19', label: '1/4000 | 1/3500' },
	{ id: '18', label: '1/3000 | 1/2500' },
	{ id: '17', label: '1/2000 | 1/1750' },
	{ id: '16', label: '1/1500 | 1/1250' },
	{ id: '15', label: '1/1000 | 1/1000' },
	{ id: '14', label: '1/725 | 1/600' },
	{ id: '13', label: '1/500 | 1/425' },
	{ id: '12', label: '1/350 | 1/300' },
	{ id: '11', label: '1/250 | 1/215' },
	{ id: '10', label: '1/180 | 1/150' },
	{ id: '9', label: '1/125 | 1/120' },
	{ id: '8', label: '1/100 | 1/100' },
	{ id: '7', label: '1/90 | 1/75' },
	{ id: '6', label: '1/60 | 1/50' },
	{ id: '5', label: '1/30 | 1/25' },
	{ id: '4', label: '1/15 | 1/12' },
	{ id: '3', label: '1/8 | 1/8' },
	{ id: '2', label: '1/4 | 1/4' },
	{ id: '1', label: '1/2 | 1/2' },
	{ id: '0', label: '1/1 | 1/1' }
];

var PRESET = [
	{ id: '63', label: 'Preset 64' },
	{ id: '62', label: 'Preset 63' },
	{ id: '61', label: 'Preset 62' },
	{ id: '60', label: 'Preset 61' },
	{ id: '59', label: 'Preset 60' },
	{ id: '58', label: 'Preset 59' },
	{ id: '57', label: 'Preset 58' },
	{ id: '56', label: 'Preset 57' },
	{ id: '55', label: 'Preset 56' },
	{ id: '54', label: 'Preset 55' },
	{ id: '53', label: 'Preset 54' },
	{ id: '52', label: 'Preset 53' },
	{ id: '51', label: 'Preset 52' },
	{ id: '50', label: 'Preset 51' },
	{ id: '49', label: 'Preset 50' },
	{ id: '48', label: 'Preset 49' },
	{ id: '47', label: 'Preset 48' },
	{ id: '46', label: 'Preset 47' },
	{ id: '45', label: 'Preset 46' },
	{ id: '44', label: 'Preset 45' },
	{ id: '43', label: 'Preset 44' },
	{ id: '42', label: 'Preset 43' },
	{ id: '41', label: 'Preset 42' },
	{ id: '40', label: 'Preset 41' },
	{ id: '39', label: 'Preset 40' },
	{ id: '38', label: 'Preset 39' },
	{ id: '37', label: 'Preset 38' },
	{ id: '36', label: 'Preset 37' },
	{ id: '35', label: 'Preset 36' },
	{ id: '34', label: 'Preset 35' },
	{ id: '33', label: 'Preset 34' },
	{ id: '32', label: 'Preset 33' },
	{ id: '31', label: 'Preset 32' },
	{ id: '30', label: 'Preset 31' },
	{ id: '29', label: 'Preset 30' },
	{ id: '28', label: 'Preset 29' },
	{ id: '27', label: 'Preset 28' },
	{ id: '26', label: 'Preset 27' },
	{ id: '25', label: 'Preset 26' },
	{ id: '24', label: 'Preset 25' },
	{ id: '23', label: 'Preset 24' },
	{ id: '22', label: 'Preset 23' },
	{ id: '21', label: 'Preset 22' },
	{ id: '20', label: 'Preset 21' },
	{ id: '19', label: 'Preset 20' },
	{ id: '18', label: 'Preset 19' },
	{ id: '17', label: 'Preset 18' },
	{ id: '16', label: 'Preset 17' },
	{ id: '15', label: 'Preset 16' },
	{ id: '14', label: 'Preset 15' },
	{ id: '13', label: 'Preset 14' },
	{ id: '12', label: 'Preset 13' },
	{ id: '11', label: 'Preset 12' },
	{ id: '10', label: 'Preset 11' },
	{ id: '9', label: 'Preset 10' },
	{ id: '8', label: 'Preset 9' },
	{ id: '7', label: 'Preset 8' },
	{ id: '6', label: 'Preset 7' },
	{ id: '5', label: 'Preset 6' },
	{ id: '4', label: 'Preset 5' },
	{ id: '3', label: 'Preset 4' },
	{ id: '2', label: 'Preset 3' },
	{ id: '1', label: 'Preset 2' },
	{ id: '0', label: 'Preset 1' }
];

	var SPEED = [
		{ id: '18', label: 'Speed 24 (Fast)' },
		{ id: '17', label: 'Speed 23' },
		{ id: '16', label: 'Speed 22' },
		{ id: '15', label: 'Speed 21' },
		{ id: '14', label: 'Speed 20' },
		{ id: '13', label: 'Speed 19' },
		{ id: '12', label: 'Speed 18' },
		{ id: '11', label: 'Speed 17' },
		{ id: '10', label: 'Speed 16' },
		{ id: '0F', label: 'Speed 15' },
		{ id: '0E', label: 'Speed 14' },
		{ id: '0D', label: 'Speed 13' },
		{ id: '0C', label: 'Speed 12' },
		{ id: '0B', label: 'Speed 11' },
		{ id: '0A', label: 'Speed 10' },
		{ id: '09', label: 'Speed 09' },
		{ id: '08', label: 'Speed 08' },
		{ id: '07', label: 'Speed 07' },
		{ id: '06', label: 'Speed 06' },
		{ id: '05', label: 'Speed 05' },
		{ id: '04', label: 'Speed 04' },
		{ id: '03', label: 'Speed 03' },
		{ id: '02', label: 'Speed 02' },
		{ id: '01', label: 'Speed 01 (Slow)' }
	];

instance.prototype.sendVISCACommand = function(payload) {
	var self = this;
	var buf = Buffer.alloc(32);

		// 0x01 0x00 = VISCA Command
		buf[0] = 0x01;
		buf[1] = 0x10;

		self.packet_counter = (self.packet_counter + 1) % 0xFFFFFFFF;

		buf.writeUInt16BE(payload.length, 2);
		buf.writeUInt32BE(self.packet_counter, 4);

		if (typeof payload == 'string') {
				buf.write(payload, 8, 'binary');
		} else if (typeof payload == 'object' && payload instanceof Buffer) {
				payload.copy(buf, 8);
		}

		var newbuf = buf.slice(0, 8 + payload.length);

		// udp.send(newbuf);

		debug('sending',newbuf,"to",self.udp.host);
		self.udp.send(newbuf);

};

instance.prototype.sendVISCACommand = function(payload, counter) {
	var self = this;
	var buf = Buffer.alloc(32);

		// 0x01 0x00 = VISCA Command
		buf[0] = 0x01;
		buf[1] = 0x10;

		self.packet_counter = (self.packet_counter + 1) % 0xFFFFFFFF;

		buf.writeUInt16BE(payload.length, 2);
		buf.writeUInt32BE(self.packet_counter, 4);

		if (typeof payload == 'string') {
				buf.write(payload, 8, 'binary');
		} else if (typeof payload == 'object' && payload instanceof Buffer) {
				payload.copy(buf, 8);
		}
		if (typeof counter == 'string') {
				buf.write(counter, 7, 'binary');
		} else if (typeof counter == 'object' && counter instanceof Buffer) {
				counter.copy(buf, 7);
		}

		var newbuf = buf.slice(0, 8 + payload.length);

		// udp.send(newbuf);

		debug('sending',newbuf,"to",self.udp.host);
		self.udp.send(newbuf);

};

instance.prototype.incomingData = function(data) {
	var self = this;
	debug('incoming',data);

	switch(data[07].toString(16)){
		case '4a': //shutter
			if(data[08] == 0x90 && data[09] == 0x51 && data[10] == 0xff){
				self.sendVISCACommand('\x81\x09\x04\x4a\xFF','\x4a');
			}
			if(data[08] == 0x90 && data[09] == 0x50 && data[10] == 0x00 && data[11] == 0x00 && data[14] == 0xff){
				self.feedbackBuffer = data[12] * 16 + data[13];
				self.checkFeedbacks('shutter');
			}
		break;
		case '5a': //shutter set
			if(data[08] == 0x90 && data[09] == 0x51 && data[10] == 0xff){
				setTimeout(function(){self.sendVISCACommand('\x81\x09\x04\x4a\xFF','\x4a');},500);
			}
			if(data[08] == 0x90 && data[09] == 0x50 && data[10] == 0x00 && data[11] == 0x00 && data[14] == 0xff){
				self.feedbackBuffer = data[12] * 16 + data[13];
				self.checkFeedbacks('shutter');
			}
		break;
		case '4c': //gain
			if(data[08] == 0x90 && data[09] == 0x51 && data[10] == 0xff){
				self.sendVISCACommand('\x81\x09\x04\x4c\xFF','\x4c');
			}
			if(data[08] == 0x90 && data[09] == 0x50 && data[10] == 0x00 && data[11] == 0x00 && data[14] == 0xff){
				self.feedbackBuffer = data[12] * 16 + data[13];
				self.checkFeedbacks('gain');
			}
		break;
		case '5c': //gain set
			if(data[08] == 0x90 && data[09] == 0x51 && data[10] == 0xff){
				setTimeout(function(){self.sendVISCACommand('\x81\x09\x04\x4c\xFF','\x4c');},500);
			}
			if(data[08] == 0x90 && data[09] == 0x50 && data[10] == 0x00 && data[11] == 0x00 && data[14] == 0xff){
				self.feedbackBuffer = data[12] * 16 + data[13];
				self.checkFeedbacks('gain');
			}
		break;
		case '43': //gain red
			if(data[08] == 0x90 && data[09] == 0x51 && data[10] == 0xff){
				self.sendVISCACommand('\x81\x09\x04\x43\xFF','\x43');
			}
			if(data[08] == 0x90 && data[09] == 0x50 && data[10] == 0x00 && data[11] == 0x00 && data[14] == 0xff){
				self.feedbackBuffer = data[12] * 16 + data[13];
				self.checkFeedbacks('gain_r');
			}
		break;
		case '44': //gain blue
			if(data[08] == 0x90 && data[09] == 0x51 && data[10] == 0xff){
				self.sendVISCACommand('\x81\x09\x04\x44\xFF','\x44');
			}
			if(data[08] == 0x90 && data[09] == 0x50 && data[10] == 0x00 && data[11] == 0x00 && data[14] == 0xff){
				self.feedbackBuffer = data[12] * 16 + data[13];
				self.checkFeedbacks('gain_b');
			}
		break;
		case '4b'://iris
			if(data[08] == 0x90 && data[09] == 0x51 && data[10] == 0xff){
				self.sendVISCACommand('\x81\x09\x04\x4b\xFF','\x4b');
			}
			if(data[08] == 0x90 && data[09] == 0x50 && data[10] == 0x00 && data[11] == 0x00 && data[14] == 0xff){
				self.feedbackBuffer = data[12] * 16 + data[13];
				self.checkFeedbacks('iris');
			}
		break;
		case '5b'://iris set
			if(data[08] == 0x90 && data[09] == 0x51 && data[10] == 0xff){
				setTimeout(function(){self.sendVISCACommand('\x81\x09\x04\x4b\xFF','\x4b');},1500);
			}
			if(data[08] == 0x90 && data[09] == 0x50 && data[10] == 0x00 && data[11] == 0x00 && data[14] == 0xff){
				self.feedbackBuffer = data[12] * 16 + data[13];
				self.checkFeedbacks('iris');
			}
		break;
	}
}

instance.prototype.sendResponse = function(data) {
	var self = this;
	debug('test');
	//self.sendVISCACommand(cmd,data);
}

instance.prototype.sendControlCommand = function(payload) {
	var self = this;
	var buf = Buffer.alloc(32);

	// 0x01 0x00 = VISCA Command
	buf[0] = 0x02;
	buf[1] = 0x00;

	self.packet_counter = (self.packet_counter + 1) % 0xFFFFFFFF;

	buf.writeUInt16BE(payload.length, 2);
	buf.writeUInt32BE(self.packet_counter, 4);

	if (typeof payload == 'string') {
			buf.write(payload, 8, 'binary');
	} else if (typeof payload == 'object' && payload instanceof Buffer) {
			payload.copy(buf, 8);
	}

	var newbuf = buf.slice(0, 8 + payload.length);

	// udp.send(newbuf);

	debug('sending',newbuf,"to",self.udp.host);
	self.udp.send(newbuf);

};

function instance(system, id, config) {
	var self = this;

	// super-constructor
	instance_skel.apply(this, arguments);
	self.actions();

	return self;
}



instance.prototype.init_udp = function() {
	var self = this;

	if (self.udp !== undefined) {
		self.udp.destroy();
		delete self.udp;
	}

	if (self.config.host !== undefined) {
		self.udp = new udp(self.config.host, self.port);
		self.init_feedbacks();

		// Reset sequence number
		self.sendControlCommand('\x01');
		self.packet_counter = 0;

		// pool monitoring
		if(self.config.poolActive == 'on'){
			self.pool_interval = setInterval(self.pool.bind(self), 3000);//ms for pool
			self.pool();
		}

		self.udp.on('status_change', function (status, message) {
			self.status(status, message);
		});
		self.udp.on('data', function (data) {
			self.incomingData(data);
		});
	debug(self.udp.host,':',self.port);
	}
};

instance.prototype.init = function() {
	var self = this;

	debug = self.debug;
	log = self.log;
	self.init_variables();

	//self.appEnv = appEnv || null;
	self.init_feedbacks();

	//self.status(self.STATUS_UNKNOWN);
	self.init_udp();
	self.actions();
	self.init_presets();

};

instance.prototype.init_variables = function() {
	var self = this;

	self.port = 52381;
	self.ptSpeed = '0C';
	self.ptSpeedIndex = 12;
	self.feedbackBuffer = 0;
	self.GAINCOLOR = [];
	for (i=0; i<256; i++) {
		self.GAINCOLOR.push({ id: i.toString(), label: i.toString() });
	}
	debug(self.GAINCOLOR[6]);
	debug(self.GAINCOLOR[6]['id']);
}

instance.prototype.updateConfig = function(config) {
	var self = this;
	self.config = config;

	if (self.udp !== undefined) {
		self.udp.destroy();
		delete self.udp;
	}

	clearInterval(self.pool_interval);

	self.status(self.STATUS_UNKNOWN);

	if (self.config.host !== undefined) {
		self.udp = new udp(self.config.host, self.port);
		self.init_feedbacks();

		// pool monitoring
		if(self.config.poolActive == 'on'){
			self.pool_interval = setInterval(self.pool.bind(self), 3000);//ms for pool
			self.pool();
		}

		self.udp.on('status_change', function (status, message) {
			self.status(status, message);
		});
	}
};

// Return config fields for web config
instance.prototype.config_fields = function () {
	var self = this;
	return [
		{
			type: 'text',
			id: 'info',
			width: 12,
			label: 'Information',
			value: 'This module controls Birddog Cameras over IP Visca protocol'
		},
		{
			type: 'textinput',
			id: 'host',
			label: 'Target IP',
			width: 6,
			regex: self.REGEX_IP
		},
		{
			type: 'dropdown',
			id: 'poolActive',
			label: 'Activate pool every 3 sec',
			default: 'off',
			choices:  [
				{ id: 'off', label: 'Off' },
				{ id: 'on', label: 'On' }
			]
		}
	]
};

// When module gets deleted
instance.prototype.destroy = function() {
	var self = this;

	clearInterval(self.pool_interval);

	var feedbacks = {};
	self.setFeedbackDefinitions(feedbacks);

	if (self.udp !== undefined) {
		self.udp.destroy();
	}
	debug("destroy", self.id);
};

instance.prototype.pool = function() {
	var self = this;

	//shutter
	self.sendVISCACommand('\x81\x09\x04\x4a\xFF','\x4a');
	//gain
	self.sendVISCACommand('\x81\x09\x04\x4c\xFF','\x4c');
	//gain red
	self.sendVISCACommand('\x81\x09\x04\x43\xFF','\x43');
	//gain blue
	self.sendVISCACommand('\x81\x09\x04\x44\xFF','\x44');
	//iris
	self.sendVISCACommand('\x81\x09\x04\x4b\xFF','\x4b');

}

instance.prototype.actions = function(system) {
	var self = this;


	var actions = {
		'power':         {
			label: 'Power On/Off',
			options: [
				{
					type: 'dropdown',
					label: 'On/Off',
					id: 'val',
					choices: [
						{ id: '0', label: 'On' },
						{ id: '1', label: 'Off' }
					],
					default: '0'
				}
			]
		},
		'initalize':         {
			label: 'Initalize / Reset',
			options: [
				{
					type: 'dropdown',
					label: 'Lens/Reset',
					id: 'val',
					choices: [
						{ id: '0', label: 'Lens Initialization' },
						{ id: '1', label: 'Camera Reset' }
					],
					default: '0'
				}
			]
		},
		'pt':         {
			label: 'Pan/Tilt',
			options: [
				{
					type: 'dropdown',
					label: 'Pan/Tilt',
					id: 'val',
					choices: [
						{ id: '0', label: 'Left' },
						{ id: '1', label: 'Right' },
						{ id: '2', label: 'Up' },
						{ id: '3', label: 'Down' },
						{ id: '4', label: 'Up Left' },
						{ id: '5', label: 'Up Right' },
						{ id: '6', label: 'Down Left' },
						{ id: '7', label: 'Down Right' },
						{ id: '8', label: 'P/T Stop' },
						{ id: '9', label: 'P/T Home' },
					],
					default: '0'
				}
			]
		},
		'ptSpeedS':       {
			label: 'P/T Speed',
			options: [
				{
					type: 'dropdown',
					label: 'speed setting',
					id: 'speed',
					choices: SPEED
				}
			]
		},
		'ptSpeedU':       { label: 'P/T Speed Up'},
		'ptSpeedD':       { label: 'P/T Speed Down'},
		'ptSlow':         {
			label: 'P/T Slow Mode',
			options: [
				{
					type: 'dropdown',
					label: 'Slow Mode On/Off',
					id: 'bol',
					choices: [ { id: '1', label: 'Off' }, { id: '0', label: 'On' } ]
				}
			]
		},
		'zoom':         {
			label: 'Zoom',
			options: [
				{
					type: 'dropdown',
					label: 'Zoom setting',
					id: 'val',
					choices: [
						{ id: '0', label: 'Zoom In' },
						{ id: '1', label: 'Zoom Out' },
						{ id: '2', label: 'Zoom Stop' },
					],
					default: '0'
				}
			]
		},
		'ciZoom':         {
			label: 'Clear Image Zoom',
			options: [
				{
					type: 'dropdown',
					label: 'Clear Image On/Off',
					id: 'bol',
					choices: [ { id: '0', label: 'Off' }, { id: '1', label: 'On' } ]
				}
			]
		},
		'focus':         {
			label: 'Focus',
			options: [
				{
					type: 'dropdown',
					label: 'Focus setting',
					id: 'val',
					choices: [
						{ id: '0', label: 'Focus Near' },
						{ id: '1', label: 'Focus Far' },
						{ id: '2', label: 'Focus Stop' },
						{ id: '3', label: 'Focus One Push Auto' },
					],
					default: '0'
				}
			]
		},
		'focusM':         {
			label: 'Focus Mode',
			options: [
				{
					type: 'dropdown',
					label: 'Auto / Manual Focus',
					id: 'bol',
					choices: [ { id: '0', label: 'Auto Focus' }, { id: '1', label: 'Manual Focus' } ],
					default: '0'
				}
			]
		},
		'expM':           {
			label: 'Exposure Mode',
			options: [
				{
					type: 'dropdown',
					label: 'Mode setting',
					id: 'val',
					choices: [
						{ id: '0', label: 'Full auto' },
						{ id: '1', label: 'Manual' },
						{ id: '2', label: 'Shutter Pri' },
						{ id: '3', label: 'Iris Pri' },
					],
					default: '0'
				}
			]
		},
		'wb':           {
			label: 'White Balance',
			options: [
				{
					type: 'dropdown',
					label: 'Mode setting',
					id: 'val',
					choices: [
						{ id: '0', label: 'Auto' },
						{ id: '1', label: 'Indoor' },
						{ id: '2', label: 'Outdoor' },
						{ id: '3', label: 'One Push Mode' },
						{ id: '4', label: 'ATW' },
						{ id: '5', label: 'Manual' },
						{ id: '6', label: 'One Push Trigger' },
						{ id: '7', label: 'Outdoor Auto' },
						{ id: '8', label: 'Sodium Lamp Auto' },
						{ id: '9', label: 'Sodium Lamp' },
						{ id: '10', label: 'Sodium Lamp Outdoor Auto' }
					],
					default: '0'
				}
			]
		},
		'gain':          {
			label: 'Gain',
			options: [
				{
					type: 'dropdown',
					label: 'Gain setting',
					id: 'val',
					choices: [
						{id: 'up', label: 'UP'},
						{id: 'down', label: 'DOWN'},
						{id: 'reset', label: 'RESET'},
						{id: 'value', label: 'VALUE'}
					],
					default: 'up'
				},
				{
					type: 'dropdown',
					label: 'VALUE',
					id: 'value',
					choices:   GAIN,
					default: 01
				}
			]
		},
		'gainRed':          {
			label: 'Gain Red',
			options: [
				{
					type: 'dropdown',
					label: 'Gain Red setting',
					id: 'val',
					choices: [
						{id: 'up', label: 'UP'},
						{id: 'down', label: 'DOWN'},
						{id: 'reset', label: 'RESET'},
						{id: 'value', label: 'VALUE'}
					],
					default: 'up'
				},
				{
					type: 'dropdown',
					label: 'VALUE',
					id: 'value',
					choices: self.GAINCOLOR,
					default: '200'
				}
			]
		},
		'gainBlue':          {
			label: 'Gain Blue',
			options: [
				{
					type: 'dropdown',
					label: 'Gain Blue setting',
					id: 'val',
					choices: [
						{id: 'up', label: 'UP'},
						{id: 'down', label: 'DOWN'},
						{id: 'reset', label: 'RESET'},
						{id: 'value', label: 'VALUE'}
					],
					default: 'up'
				},
				{
					type: 'dropdown',
					label: 'VALUE',
					id: 'value',
					choices: self.GAINCOLOR,
					default: '200'
				}
			]
		},
		'iris':          {
			label: 'Iris',
			options: [
				{
					type: 'dropdown',
					label: 'Iris setting',
					id: 'val',
					choices: [
						{id: 'up', label: 'UP'},
						{id: 'down', label: 'DOWN'},
						{id: 'reset', label: 'RESET'},
						{id: 'value', label: 'VALUE'}
					],
					default: 'up'
				},
				{
					type: 'dropdown',
					label: 'VALUE',
					id: 'value',
					choices: IRIS,
					default: 11
				}
			]
		},
		'shut':          {
			label: 'Shutter',
			options: [
				{
					type: 'dropdown',
					label: 'Shutter setting',
					id: 'val',
					choices: [
						{id: 'up', label: 'UP'},
						{id: 'down', label: 'DOWN'},
						{id: 'reset', label: 'RESET'},
						{id: 'value', label: 'VALUE'}
					],
					default: 'up'
				},
				{
					type: 'dropdown',
					label: 'VALUE',
					id: 'value',
					choices: SHUTTER,
					default: 11
				}
			]
		},
		'savePset':       {
			label: 'Save Preset',
			options: [
				{
					type: 'dropdown',
					label: 'Preset Nr.',
					id: 'val',
					choices: PRESET,
					default: 0
				}
			]
		},
		'recallPset':     {
			label: 'Recall Preset',
			options: [
				{
					type: 'dropdown',
					label: 'Preset Nr.',
					id: 'val',
					choices: PRESET,
					default: 0
				}
			]
		},
		'pictureEffect':     {
			label: 'Picture Effect Setting',
			options: [
				{
					type: 'dropdown',
					label: 'Effect',
					id: 'val',
					choices: [ 
						{ id: '0', label: 'Off' },
						{ id: '1', label: 'Neg.Art' },
						{ id: '2', label: 'Black White' }
					],
					default: '0'
				}
			]
		},
		'defog':          {
			label: 'Defog',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: [
						{ id: '0', label: 'Off' },
						{ id: '1', label: 'low' },
						{ id: '2', label: 'mid' },
						{ id: '3', label: 'high' }
						],
					default: '0'
				}
			]
		},
		'irMode':          {
			label: 'IR Correction',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'bol',
					choices: [
						{ id: '0', label: 'Standard' },
						{ id: '1', label: 'IR Light' }
						],
					default: '0'
				}
			]
		},
		'hrMode':          {
			label: 'High Resolution Mode',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'bol',
					choices: [
						{ id: '0', label: 'Off' },
						{ id: '1', label: 'On' }
						],
					default: '0'
				}
			]
		},
		'highSensitivity':          {
			label: 'High Sensitivity on/off',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'bol',
					choices: [
						{ id: '0', label: 'Off' },
						{ id: '1', label: 'On' }
						],
					default: '0'
				}
			]
		},
		'tally':          {
			label: 'Tally on/off',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'bol',
					choices: [ { id: '0', label: 'Off' }, { id: '1', label: 'On' } ],
					default: '0'
				}
			]
		},
		'freeze':          {
			label: 'Freeze',
			options: [
				{
					type: 'dropdown',
					label: 'Freeze On/Off',
					id: 'val',
					choices: [ 
						{ id: '0', label: 'On' },
						{ id: '1', label: 'Off' }
					],
					default: '0'
				}
			]
		},
		'picFlip':          {
			label: 'Picture Flip',
			options: [
				{
					type: 'dropdown',
					label: 'Flip On/Off',
					id: 'val',
					choices: [ 
						{ id: '0', label: 'Off' },
						{ id: '1', label: 'On' }
					],
					default: '0'
				}
			]
		},
		'picMirror':          {
			label: 'Picture Mirror',
			options: [
				{
					type: 'dropdown',
					label: 'Mirror On/Off',
					id: 'val',
					choices: [ 
						{ id: '0', label: 'Off' },
						{ id: '1', label: 'On' }
					],
					default: '0'
				}
			]
		},
		'custom':          {
			label: 'Custom Command',
			options: [
				{
					type: 'textinput',
					label: 'Custom command, must start with 8',
					id: 'custom',
					regex: '/^8[0-9a-fA-F]\\s*([0-9a-fA-F]\\s*)+$/',
					width: 6
				}
			]
		}
	};
	self.setActions(actions);
}

instance.prototype.action = function(action) {
	var self = this;
	var opt = action.options;
	var cmd = '';
	var fb = '';

	switch (action.action) {
		case 'power':
			if (opt.val == '0') {
				cmd = '\x81\x01\x04\x00\x02\xFF';
			}
			if (opt.val == '1') {
				cmd = '\x81\x01\x04\x00\x03\xFF';
			}
			self.sendVISCACommand(cmd);
			break;

		case 'initalize':
			if (opt.val == '0') {
				cmd = '\x81\x04\x19\x01\xFF';
			}
			if (opt.val == '1') {
				cmd = '\x81\x04\x19\x03\xFF';
			}
			self.sendVISCACommand(cmd);
			break;

		case 'pt':
			switch(opt.val){
				case '0':
					cmd = '\x81\x01\x06\x01'+ String.fromCharCode(parseInt(self.ptSpeed,16) & 0xFF) + String.fromCharCode(parseInt(self.ptSpeed,16) & 0xFF) +'\x01\x03\xFF';
				break;
				case '1':
					cmd = '\x81\x01\x06\x01'+ String.fromCharCode(parseInt(self.ptSpeed,16) & 0xFF) + String.fromCharCode(parseInt(self.ptSpeed,16) & 0xFF) +'\x02\x03\xFF';
				break;
				case '2':
					cmd = '\x81\x01\x06\x01'+ String.fromCharCode(parseInt(self.ptSpeed,16) & 0xFF) + String.fromCharCode(parseInt(self.ptSpeed,16) & 0xFF) +'\x03\x01\xFF';
				break;
				case '3':
					cmd = '\x81\x01\x06\x01'+ String.fromCharCode(parseInt(self.ptSpeed,16) & 0xFF) + String.fromCharCode(parseInt(self.ptSpeed,16) & 0xFF) +'\x03\x02\xFF';
				break;
				case '4':
					cmd = '\x81\x01\x06\x01'+ String.fromCharCode(parseInt(self.ptSpeed,16) & 0xFF) + String.fromCharCode(parseInt(self.ptSpeed,16) & 0xFF) +'\x01\x01\xFF';
				break;
				case '5':
					cmd = '\x81\x01\x06\x01'+ String.fromCharCode(parseInt(self.ptSpeed,16) & 0xFF) + String.fromCharCode(parseInt(self.ptSpeed,16) & 0xFF) +'\x02\x01\xFF';
				break;
				case '6':
					cmd = '\x81\x01\x06\x01'+ String.fromCharCode(parseInt(self.ptSpeed,16) & 0xFF) + String.fromCharCode(parseInt(self.ptSpeed,16) & 0xFF) +'\x01\x02\xFF';
				break;
				case '7':
					cmd = '\x81\x01\x06\x01'+ String.fromCharCode(parseInt(self.ptSpeed,16) & 0xFF) + String.fromCharCode(parseInt(self.ptSpeed,16) & 0xFF) +'\x02\x02\xFF';
				break;
				case '8':
					cmd = '\x81\x01\x06\x01'+ String.fromCharCode(parseInt(self.ptSpeed,16) & 0xFF) + String.fromCharCode(parseInt(self.ptSpeed,16) & 0xFF) +'\x03\x03\xFF';
				break;
				case '9':
					cmd = '\x81\x01\x06\x04\xFF';
				break;
			}
			self.sendVISCACommand(cmd);
			break;

		case 'ptSlow':
			if (opt.bol == '0') {
				cmd = '\x81\x01\x06\x44\x02\xFF';
			}
			if (opt.bol == '1') {
				cmd = '\x81\x01\x06\x44\x03\xFF';
			}
			self.sendVISCACommand(cmd);
			break;

		case 'ptSpeedS':
			self.ptSpeed = opt.speed;

			var idx = -1;
			for (var i = 0; i < SPEED.length; ++i) {
				if (SPEED[i].id == self.ptSpeed) {
					idx = i;
					break;
				}
			}
			if (idx > -1) {
				self.ptSpeedIndex = idx;
			}
			debug(self.ptSpeed + ' == ' + self.ptSpeedIndex)
			break;

		case 'ptSpeedD':
			if (self.ptSpeedIndex == 23) {
				self.ptSpeedIndex = 23;
			}
			else if (self.ptSpeedIndex < 23) {
				self.ptSpeedIndex ++;
			}
			self.ptSpeed = SPEED[self.ptSpeedIndex].id
			break;

		case 'ptSpeedU':
			if (self.ptSpeedIndex == 0) {
				self.ptSpeedIndex = 0;
			}
			else if (self.ptSpeedIndex > 0) {
				self.ptSpeedIndex--;
			}
			self.ptSpeed = SPEED[self.ptSpeedIndex].id
			break;

		case 'zoom':
			switch(opt.val){
				case '0':
					cmd = '\x81\x01\x04\x07\x02\xFF';
				break;
				case '1':
					cmd = '\x81\x01\x04\x07\x03\xFF';
				break;
				case '2':
					cmd = '\x81\x01\x04\x07\x00\xFF';
				break;
			}
			self.sendVISCACommand(cmd);
			break;

		case 'ciZoom':
			if (opt.bol == 0){
				cmd = '\x81\x01\x04\x06\x03\xFF';
			}
			if (opt.bol == 1){
				cmd = '\x81\x01\x04\x06\x04\xFF';
			}
			self.sendVISCACommand(cmd);
			break;

		case 'focus':
			switch(opt.val){
				case '0':
					cmd = '\x81\x01\x04\x08\x03\xFF';
				break;
				case '1':
					cmd = '\x81\x01\x04\x08\x02\xFF';
				break;
				case '2':
					cmd = '\x81\x01\x04\x08\x00\xFF';
				break;
				case '3':
					cmd = '\x81\x01\x04\x18\x01\xFF';
				break;
			}
			self.sendVISCACommand(cmd);
			break;

		case 'focusM':
			if (opt.bol == 0){
				cmd = '\x81\x01\x04\x38\x02\xFF';
			}
			if (opt.bol == 1){
				cmd = '\x81\x01\x04\x38\x03\xFF';
			}
			self.sendVISCACommand(cmd);
			break;

		case 'expM':
			if (opt.val == 0){
				cmd = '\x81\x01\x04\x39\x00\xFF';
			}
			if (opt.val == 1){
				cmd = '\x81\x01\x04\x39\x03\xFF';
			}
			if (opt.val == 2){
				cmd = '\x81\x01\x04\x39\x0A\xFF';
			}
			if (opt.val == 3){
				cmd = '\x81\x01\x04\x39\x0B\xFF';
			}
			if (opt.val == 4){
				cmd = '\x81\x01\x04\x39\x0E\xFF';
			}
			self.sendVISCACommand(cmd);
			break;

		case 'wb':
			switch(opt.val){
				case '0':
					cmd = '\x81\x01\x04\x35\x00\xFF';
				break;
				case '1':
					cmd = '\x81\x01\x04\x35\x01\xFF';
				break;
				case '2':
					cmd = '\x81\x01\x04\x35\x02\xFF';
				break;
				case '3':
					cmd = '\x81\x01\x04\x35\x03\xFF';
				break;
				case '4':
					cmd = '\x81\x01\x04\x35\x04\xFF';
				break;
				case '5':
					cmd = '\x81\x01\x04\x35\x05\xFF';
				break;
				case '6':
					cmd = '\x81\x01\x04\x10\x05\xFF';
				break;
				case '7':
					cmd = '\x81\x01\x04\x35\x06\xFF';
				break;
				case '8':
					cmd = '\x81\x01\x04\x35\x07\xFF';
				break;
				case '9':
					cmd = '\x81\x01\x04\x35\x08\xFF';
				break;
				case '10':
					cmd = '\x81\x01\x04\x35\x09\xFF';
				break;
			}
			self.sendVISCACommand(cmd);
			break;

		case 'gain':
			fb = Buffer.from('\x4c','binary');
			switch (opt.val) {
				case 'up':
					cmd = '\x81\x01\x04\x0C\x02\xFF';
					break;
				case 'down':
					cmd = '\x81\x01\x04\x0C\x03\xFF';
					break;
				case 'reset':
					cmd = '\x81\x01\x04\x0C\x00\xFF';
					break;
				case 'value':
					cmd = Buffer.from('\x81\x01\x04\x4C\x00\x00\x00\x00\xFF', 'binary');
					var number = opt.value;
					if(number > 255){
						number = '255';
					}
					cmd.writeUInt8(number.toString(8) >> 4,6);
					cmd.writeUInt8((number - parseInt(number.toString(8) >> 4)*16),7);
					fb = Buffer.from('\x5c','binary');
					break;
			}
			self.sendVISCACommand(cmd,fb);
			break;

		case 'gainRed':
			fb = Buffer.from('\x43','binary');
			switch (opt.val) {
				case 'up':
					cmd = '\x81\x01\x04\x03\x02\xFF';
					break;
				case 'down':
					cmd = '\x81\x01\x04\x03\x03\xFF';
					break;
				case 'reset':
					cmd = '\x81\x01\x04\x03\x00\xFF';
					break;
				case 'value':
					cmd = Buffer.from('\x81\x01\x04\x43\x00\x00\x00\x00\xFF', 'binary');
					var number = opt.value;
					if(number > 255){
						number = '255';
					}
					cmd.writeUInt8(number.toString(8) >> 4,6);
					cmd.writeUInt8((number - parseInt(number.toString(8) >> 4)*16),7);
					break;
			}
			self.sendVISCACommand(cmd,fb);
			break;

		case 'gainBlue':
			fb = Buffer.from('\x44','binary');
			switch (opt.val) {
				case 'up':
					cmd = '\x81\x01\x04\x04\x02\xFF';
					break;
				case 'down':
					cmd = '\x81\x01\x04\x04\x03\xFF';
					break;
				case 'reset':
					cmd = '\x81\x01\x04\x04\x00\xFF';
					break;
				case 'value':
					cmd = Buffer.from('\x81\x01\x04\x44\x00\x00\x00\x00\xFF', 'binary');
					var number = opt.value;
					if(number > 255){
						number = '255';
					}
					cmd.writeUInt8(number.toString(8) >> 4,6);
					cmd.writeUInt8((number - parseInt(number.toString(8) >> 4)*16),7);
					break;
			}
			self.sendVISCACommand(cmd,fb);
			break;

		case 'iris':
			fb = Buffer.from('\x4b','binary');
			switch (opt.val) {
				case 'up':
					cmd = '\x81\x01\x04\x0B\x02\xFF';
					break;
				case 'down':
					cmd = '\x81\x01\x04\x0B\x03\xFF';
					break;
				case 'reset':
					cmd = '\x81\x01\x04\x0B\x00\xFF';
					break;
				case 'value':
					cmd = Buffer.from('\x81\x01\x04\x4B\x00\x00\x00\x00\xFF', 'binary');
					var number = opt.value;
					if(number > 255){
						number = '255';
					}
					debug(number);
					cmd.writeUInt8(number.toString(8) >> 4,6);
					cmd.writeUInt8((number - parseInt(number.toString(8) >> 4)*16),7);
					fb = Buffer.from('\x5b','binary');
					break;
			}
			self.sendVISCACommand(cmd,fb);
			break;

		case 'shut':
			fb = Buffer.from('\x4a','binary');
			switch (opt.val) {
				case 'up':
					cmd = '\x81\x01\x04\x0A\x02\xFF';
					break;
				case 'down':
					cmd = '\x81\x01\x04\x0A\x03\xFF';
					break;
				case 'reset':
					cmd = '\x81\x01\x04\x0A\x00\xFF';
					break;
				case 'value':
					cmd = Buffer.from('\x81\x01\x04\x4A\x00\x00\x00\x00\xFF', 'binary');
					var number = opt.value;
					if(number > 255){
						number = '255';
					}
					debug(number);
					cmd.writeUInt8(number.toString(8) >> 4,6);
					cmd.writeUInt8((number - parseInt(number.toString(8) >> 4)*16),7);
					fb = Buffer.from('\x5a','binary');
					break;
			}
			self.sendVISCACommand(cmd,fb);
			break;

		case 'savePset':
			cmd = Buffer.from('\x81\x01\x04\x3F\x01\x00\xFF', 'binary');
			cmd.writeUInt8(opt.val,5);
			//cmd.writeUInt8((opt.val - parseInt(opt.val.toString(8) >> 4)*16),7);
			self.sendVISCACommand(cmd);
			break;

		case 'recallPset':
			cmd = Buffer.from('\x81\x01\x04\x3F\x02\x00\xFF', 'binary');
			cmd.writeUInt8(opt.val,5);
			//cmd.writeUInt8((opt.val - parseInt(opt.val.toString(8) >> 4)*16),7);
			self.sendVISCACommand(cmd);
			break;


		case 'pictureEffect':
			switch(opt.val){
				case '0':
					cmd = '\x81\x01\x04\x63\x00\xFF';
				break;
				case '1':
					cmd = '\x81\x01\x04\x63\x02\xFF';
				break;
				case '2':
					cmd = '\x81\x01\x04\x63\x04\xFF';
				break;
			}
			self.sendVISCACommand(cmd);
			break;

		case 'defog':
			switch(opt.val){
				case '0':
					cmd = '\x81\x01\x04\x37\x03\xFF';
				break;
				case '1':
					cmd = '\x81\x01\x04\x37\x01\xFF';
				break;
				case '2':
					cmd = '\x81\x01\x04\x37\x02\xFF';
				break;
				case '3':
					cmd = '\x81\x01\x04\x37\x03\xFF';
				break;
			}
			self.sendVISCACommand(cmd);
			break;

		case 'irMode':
			if (opt.bol == 0){
				cmd = '\x81\x01\x04\x11\x00\xFF';
			}
			if (opt.bol == 1){
				cmd = '\x81\x01\x04\x11\x01\xFF';
			}
			self.sendVISCACommand(cmd);
			break;

		case 'hrMode':
			if (opt.bol == 0){
				cmd = '\x81\x01\x04\x52\x03\xFF';
			}
			if (opt.bol == 1){
				cmd = '\x81\x01\x04\x52\x02\xFF';
			}
			self.sendVISCACommand(cmd);
			break;

		case 'highSensitivity':
			if (opt.bol == 0){
				cmd = '\x81\x01\x04\x5E\x03\xFF';
			}
			if (opt.bol == 1){
				cmd = '\x81\x01\x04\x5E\x02\xFF';
			}
			self.sendVISCACommand(cmd);
			break;

		case 'tally':
			if (opt.bol == 0){
				cmd = '\x81\x01\x7E\x01\x0A\x00\x03\xFF';
			}
			if (opt.bol == 1){
				cmd = '\x81\x01\x7E\x01\x0A\x00\x02\xFF';
			}
			self.sendVISCACommand(cmd);
			break;

		case 'freeze':
			switch(opt.val){
				case '0':
					cmd = '\x81\x01\x04\x62\x02\xFF';
				break;
				case '1':
					cmd = '\x81\x01\x04\x62\x03\xFF';
				break;
			}
			self.sendVISCACommand(cmd);
			break;

		case 'picFlip':
			switch(opt.val){
				case '0':
					cmd = '\x81\x01\x04\x66\x03\xFF';
				break;
				case '1':
					cmd = '\x81\x01\x04\x66\x02\xFF';
				break;
			}
			self.sendVISCACommand(cmd);
			break;

		case 'picMirror':
			switch(opt.val){
				case '0':
					cmd = '\x81\x01\x04\x61\x03\xFF';
				break;
				case '1':
					cmd = '\x81\x01\x04\x61\x02\xFF';
				break;
			}
			self.sendVISCACommand(cmd);
			break;

		case 'custom':
			var hexData = opt.custom.replace(/\s+/g, '');
			var tempBuffer = Buffer.from(hexData, 'hex');
			cmd = tempBuffer.toString('binary');
			if ((tempBuffer[0] & 0xF0) === 0x80) {
				self.sendVISCACommand(cmd);
			} else {
				self.log('error', 'Error, command "' + opt.custom + '" does not start with 8');
			}
		break;
	}
};

instance.prototype.init_feedbacks = function() {
	var self = this;
	debug('feedback are created');
	var feedbacks = {
		shutter:{
			label: 'Shutter',
			callback: function(feedback, bank) {
				debug('feedback:',self.feedbackBuffer.toString());
				for(i = 0; i<SHUTTER.length;i++){
					if(SHUTTER[i]['id'] == self.feedbackBuffer.toString()){
						return {
							text: SHUTTER[i]['label'].toString()
						}
					}
				}
			}//close callback
		},//close Shutter
		gain:{
			label: 'Gain',
			callback: function(feedback, bank) {
				debug('feedback:',self.feedbackBuffer.toString());
				for(i = 0; i<GAIN.length;i++){
					if(GAIN[i]['id'] == self.feedbackBuffer.toString()){
						return {
							text: GAIN[i]['label'].toString()
						}
					}
				}
			}//close callback
		},//close gain
		gain_r:{
			label: 'Gain Red',
			callback: function(feedback, bank) {
				debug('feedback:',self.feedbackBuffer.toString());
				return {
					text: self.feedbackBuffer.toString()
				}
			}//close callback
		},//close gain_r
		gain_b:{
			label: 'Gain Blue',
			callback: function(feedback, bank) {
				debug('feedback:',self.feedbackBuffer.toString());
				return {
					text: self.feedbackBuffer.toString()
				}
			}//close callback
		},//close gain_r
		iris:{
			label: 'Iris',
			callback: function(feedback, bank) {
				debug('feedback:',self.feedbackBuffer.toString(8));
				var msg = 'CLOSED';
				switch (self.feedbackBuffer.toString(8)) {
					case '0':
						msg = 'CLOSED';
						break;
					case '3':
						msg = 'CLOSED';
						break;
					case '1':
						msg = 'F14.0';
						break;
					case '5':
						msg = 'F14.0';
						break;
					case '2':
						msg = 'F11.0';
						break;
					case '6':
						msg = 'F11.0';
						break;
					case '7':
						msg = 'F9.6';
						break;
					case '10':
						msg = 'F8.0';
						break;
					case '11':
						msg = 'F6.8';
						break;
					case '12':
						msg = 'F5.6';
						break;
					case '13':
						msg = 'F4.8';
						break;
					case '14':
						msg = 'F4.0';
						break;
					case '15':
						msg = 'F3.4';
						break;
					case '16':
						msg = 'F2.8';
						break;
					case '17':
						msg = 'F2.4';
						break;
					case '20':
						msg = 'F2.0';
						break;
					case '21':
						msg = 'F1.6 OPEN';
						break;
				}
				return {
					text: msg
				}
			}//close callback
		}//close iris
	};//close feedbacks
	self.setFeedbackDefinitions(feedbacks);
}

instance.prototype.init_presets = function () {
	var self = this;
	var presets = [
		{
			category: 'Pan/Tilt',
			label: 'UP',
			bank: {
				style: 'png',
				text: '',
				png64: image_up,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'pt',
					options: {
						val: '2'
					}
				}
			],
			release_actions: [
				{
					action: 'pt',
					options: {
						val: '8'
					}
				}
			]
		},
		{
			category: 'Pan/Tilt',
			label: 'DOWN',
			bank: {
				style: 'png',
				text: '',
				png64: image_down,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'pt',
					options: {
						val: '3'
					}
				}
			],
			release_actions: [
				{
					action: 'pt',
					options: {
						val: '8'
					}
				}
			]
		},
		{
			category: 'Pan/Tilt',
			label: 'LEFT',
			bank: {
				style: 'png',
				text: '',
				png64: image_left,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'pt',
					options: {
						val: '0'
					}
				}
			],
			release_actions: [
				{
					action: 'pt',
					options: {
						val: '8'
					}
				}
			]
		},
		{
			category: 'Pan/Tilt',
			label: 'RIGHT',
			bank: {
				style: 'png',
				text: '',
				png64: image_right,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'pt',
					options: {
						val: '1'
					}
				}
			],
			release_actions: [
				{
					action: 'pt',
					options: {
						val: '8'
					}
				}
			]
		},
		{
			category: 'Pan/Tilt',
			label: 'UP RIGHT',
			bank: {
				style: 'png',
				text: '',
				png64: image_up_right,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'pt',
					options: {
						val: '5'
					}
				}
			],
			release_actions: [
				{
					action: 'pt',
					options: {
						val: '8'
					}
				}
			]
		},
		{
			category: 'Pan/Tilt',
			label: 'UP LEFT',
			bank: {
				style: 'png',
				text: '',
				png64: image_up_left,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'pt',
					options: {
						val: '4'
					}
				}
			],
			release_actions: [
				{
					action: 'pt',
					options: {
						val: '8'
					}
				}
			]
		},
		{
			category: 'Pan/Tilt',
			label: 'DOWN LEFT',
			bank: {
				style: 'png',
				text: '',
				png64: image_down_left,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'pt',
					options: {
						val: '6'
					}
				}
			],
			release_actions: [
				{
					action: 'pt',
					options: {
						val: '8'
					}
				}
			]
		},
		{
			category: 'Pan/Tilt',
			label: 'DOWN RIGHT',
			bank: {
				style: 'png',
				text: '',
				png64: image_down_right,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'pt',
					options: {
						val: '7'
					}
				}
			],
			release_actions: [
				{
					action: 'pt',
					options: {
						val: '8'
					}
				}
			]
		},
		{
			category: 'Pan/Tilt',
			label: 'Home',
			bank: {
				style: 'text',
				text: 'HOME',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'pt',
					options: {
						val: '9'
					}
				}
			]
		},
		{
			category: 'Pan/Tilt',
			label: 'Speed Up',
			bank: {
				style: 'text',
				text: 'SPEED\\nUP',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'ptSpeedU',
				}
			]
		},
		{
			category: 'Pan/Tilt',
			label: 'Speed Down',
			bank: {
				style: 'text',
				text: 'SPEED\\nDOWN',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'ptSpeedD',
				}
			]
		},
		{
			category: 'Lens',
			label: 'Zoom In',
			bank: {
				style: 'text',
				text: 'ZOOM\\nIN',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'zoom',
					options: {
						val: '0'
					}
				}
			],
			release_actions: [
				{
					action: 'zoom',
					options: {
						val: '2'
					}
				}
			]
		},
		{
			category: 'Lens',
			label: 'Zoom Out',
			bank: {
				style: 'text',
				text: 'ZOOM\\nOUT',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'zoom',
					options: {
						val: '1'
					}
				}
			],
			release_actions: [
				{
					action: 'zoom',
					options: {
						val: '2'
					}
				}
			]
		},
		{
			category: 'Lens',
			label: 'CI Zoom',
			bank: {
				style: 'text',
				text: 'CI\\nZOOM',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
				latch: true
			},
			actions: [
				{
					action: 'ciZoom',
					options: {
						bol: 1,
					}
				}
			],
			release_actions: [
				{
					action: 'ciZoom',
					options: {
						bol: 0,
					}
				}
			]
		},
		{
			category: 'Lens',
			label: 'Focus Near',
			bank: {
				style: 'text',
				text: 'FOCUS\\nNEAR',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'focus',
					options: {
						val: '0'
					}
				}
			],
			release_actions: [
				{
					action: 'focus',
					options: {
						val: '2'
					}
				}
			]
		},
		{
			category: 'Lens',
			label: 'Focus Far',
			bank: {
				style: 'text',
				text: 'FOCUS\\nFAR',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'focus',
					options: {
						val: '1'
					}
				}
			],
			release_actions: [
				{
					action: 'focus',
					options: {
						val: '2'
					}
				}
			]
		},
		{
			category: 'Lens',
			label: 'Auto Focus',
			bank: {
				style: 'text',
				text: 'AUTO\\nFOCUS',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
				latch: true
			},
			actions: [
				{
					action: 'focusM',
					options: {
						bol: 0,
					}
				}
			],
			release_actions: [
				{
					action: 'focusM',
					options: {
						bol: 1,
					}
				}
			]
		},
		{
			category: 'Lens',
			label: 'One Push Auto Focus',
			bank: {
				style: 'text',
				text: 'O.P.\\nAF',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'focus',
					options: {
						val: '3'
					}
				}
			]
		},
		{
			category: 'Exposure',
			label: 'Exposure Mode',
			bank: {
				style: 'text',
				text: 'EXP\\nMODE',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
				latch: true
			},
			actions: [
				{
					action: 'expM',
					options: {
						bol: 0,
					}
				}
			],
			release_actions: [
				{
					action: 'expM',
					options: {
						bol: 1,
					}
				}
			]
		},
		{
			category: 'Exposure',
			label: 'Gain Up',
			bank: {
				style: 'text',
				text: 'GAIN\\nUP',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'gain',
					options: {
						val: 'up'
					}
				}
			]
		},
		{
			category: 'Exposure',
			label: 'Gain Down',
			bank: {
				style: 'text',
				text: 'GAIN\\nDOWN',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'gain',
					options: {
						val: 'down'
					}
				}
			]
		},
		{
			category: 'Exposure',
			label: 'Iris Up',
			bank: {
				style: 'text',
				text: 'IRIS\\nUP',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'iris',
					options: {
						val: 'up'
					}
				}
			]
		},
		{
			category: 'Exposure',
			label: 'Iris Down',
			bank: {
				style: 'text',
				text: 'IRIS\\nDOWN',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'iris',
					options: {
						val: 'down'
					}
				}
			]
		},
		{
			category: 'Exposure',
			label: 'Shutter Up',
			bank: {
				style: 'text',
				text: 'Shut\\nUP',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'shut',
					options: {
						val: 'up'
					}
				}
			]
		},
		{
			category: 'Exposure',
			label: 'Shutter Down',
			bank: {
				style: 'text',
				text: 'Shut\\nDOWN',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'shut',
					options: {
						val: 'down'
					}
				}
			]
		},
		{
			category: 'Exposure',
			label: 'Gain Feedback',
			bank: {
				style: 'text',
				text: 'Shut\\nFeedback',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			feedbacks: [
				{
					type: 'gain',
				}
			]
		},
		{
			category: 'Exposure',
			label: 'Shutter Feedback',
			bank: {
				style: 'text',
				text: 'Shut\\nFeedback',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			feedbacks: [
				{
					type: 'shutter',
				}
			]
		},
		{
			category: 'Exposure',
			label: 'Iris Feedback',
			bank: {
				style: 'text',
				text: 'Shut\\nFeedback',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			feedbacks: [
				{
					type: 'iris',
				}
			]
		},
		{
			category: 'Color',
			label: 'Red Gain Up',
			bank: {
				style: 'text',
				text: 'Red\\nUp',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'gainRed',
					options: {
						val: 'up'
					}
				}
			]
		},
		{
			category: 'Color',
			label: 'Red Gain Down',
			bank: {
				style: 'text',
				text: 'Red\\nDown',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'gainRed',
					options: {
						val: 'down'
					}
				}
			]
		},
		{
			category: 'Color',
			label: 'Blue Gain Up',
			bank: {
				style: 'text',
				text: 'Blue\\nUp',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'gainBlue',
					options: {
						val: 'up'
					}
				}
			]
		},
		{
			category: 'Color',
			label: 'Blue Gain Down',
			bank: {
				style: 'text',
				text: 'Blue\\nDown',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'gainBlue',
					options: {
						val: 'down'
					}
				}
			]
		},
		{
			category: 'Color',
			label: 'Red Feedback',
			bank: {
				style: 'text',
				text: 'Red\\nFeedback',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(255,0,0),
			},
			feedbacks: [
				{
					type: 'gain_r'
				}
			]
		},
		{
			category: 'Color',
			label: 'Blue Feedback',
			bank: {
				style: 'text',
				text: 'Blue\\nFeedback',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,255),
			},
			feedbacks: [
				{
					type: 'gain_b'
				}
			]
		}
	];

	var save;
	for (save = 0; save < 16; save++) {
		presets.push({
			category: 'Save Preset',
			label: 'Save Preset '+ parseInt(save+1) ,
			bank: {
				style: 'text',
				text: 'SAVE\\nPSET\\n' + parseInt(save+1) ,
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'savePset',
					options: {
					val: '0' + save.toString(16).toUpperCase(),
					}
				}
			]
		}
		);
	}

	var recall;
	for (recall = 0; recall < 16; recall++) {
		presets.push({
			category: 'Recall Preset',
			label: 'Recall Preset '+ parseInt(recall+1) ,
			bank: {
				style: 'text',
				text: 'Recall\\nPSET\\n' + parseInt(recall+1) ,
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'recallPset',
					options: {
					val: '0' + recall.toString(16).toUpperCase(),
					}
				}
			]
		});
	}

	self.setPresetDefinitions(presets);
};

instance_skel.extendedBy(instance);

 // Variables for Base64 image data do not edit
var image_up = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAIFJREFUKM+90EEKgzAQRmFDFy49ghcp5FquVPBighcRegHBjWDJ68D8U6F7m00+EnhkUlW3ru6rdyCV0INQzSg1zFLLKmU2aeCQQMEEJXIQORRsTLNyKJhNm3IoaPBg4mQorp2Mh1+00kKN307o/bZrpt5O/FlPU/c75X91/fPd6wPRD1eHyHEL4wAAAABJRU5ErkJggg==';

var image_down = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAIlJREFUKM/F0DEOwyAMBVAjDxk5Qo7CtdiClIv1KJF6gUpZIhXxY2zTDJ2benoS8LFN9MsKbYjxF2XRS1UZ4bCeGFztFmNqphURpidm146kpwFvLDYJpPQtLSLNoySyP2bRpoqih2oSFW8K3lYAxmJGXA88XMnjeuDmih7XA8vXvNeeqX6U6aY6AacbWAQNWOPUAAAAAElFTkSuQmCC';

var image_left = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAHpJREFUKM+1kTEOgCAQBM9Q2JjwA/mJPA2fxlN4giWF8TRBBhMpbKSaZie3i8gPb4Y8FNZKGm8YIAONkNWacIruQLejy+gyug1dQhfRqZa0v6gYA6QfqSWapZnto1B6XdUuFaVHoJunr2MD21nIdJYUEhLYfoGmP777BKKIXC0eYSD5AAAAAElFTkSuQmCC';

var image_right = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAHhJREFUKM+10LERgCAMQFE4CktHcBRWcRMYzVEcwdKCI+od+fGksVCq3/AuiXOfvZnaNXzRClVrEKtMLdSqP2RTRQAFMAFGwAlw7MAk0sAzGnhVoerLKg/F5Pv4NoFNZZNGpk9sxJYeLsDdL5T7S8IFOM/R3OZ+fQeQZV9pMy+bVgAAAABJRU5ErkJggg==';

var image_up_right = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAMAAAAk2e+/AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAABhlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+X02G5AAAAgXRSTlMAAte32QZhZx7d+TywDTf8/d5VstYPOxULNvKmSY8TFBrxyeGCluJeELQ5uw7ULND4BedlKuv2P/vDA8UgCk30WO41s8+5X8dABAz6QhHVaR156JpPnihSfTJDNOMBm4bzSICqr23NsRjcGRbtjTCS2lzsOmyu9+WLKb2fTL8+RPDhqO4yAAABfElEQVRYw+3WZW/CUBQG4AO0FBsOwwcMm7sLc3d3d3e388/HGGs7lpD0tsm+9P3S5CT3SdPec+8BkCNHzv9FAVAAEABYdQDkA7jo9GNUIDMBzstb5vr0/Gx8Z35zOjI36R2xbu+619eWa2xCoK0FClF5h1cWxDHEwilEOyLlQc8hokoAlMRcESBh7siQlJBWKkijNaHuPrWBED9iYiDQ7Pv1D4Z4/DXyFo2JgeAghQEkEgAvT6IgNo/PIUmgd62oj80mqEIpINoXRkmg2j2UBDIWVXKLTSXEUIOF/xbV5aRQsJvvUOoqMqjZZ+c7FcX8ThYCtTbxHV0fkEGDA73D3Dpzi/6rWEYAdSn579PZ/t3IBJChkef0dLRlHXdkJ6TSmSnmiYPq1LQIiGHX9BvZYinJ7/+R6q1czUG0j9KSOTxDc6UhshZhMIQrS78mncwZtzErrNcYL6V2Zd0tJ6i7QFtAYPcvHv25W6J+/Y3BrRA/x6WGuGN5mpUjhyyfsGtrpKE95HoAAAAASUVORK5CYII=';

var image_down_right = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAMAAAAk2e+/AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAABXFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9jYfXuAAAAc3RSTlMAQ98Ox1j9gAtRNTqBPfgu9p/MTQ+G1Qfx7Y0VBYyJgjkGd3ysU+Zz1IQvMM20PgwBp8Mi4TSUiDvlPxylsaF2WfcjJh0S+wLzQLmY4l/ovX3ra1rPLAOSKa4RUEvgcZwbFHqPzodGbX7qPMvCtsEq1laguT+HEwAAAVlJREFUWMPt1sduwkAQgOGxDfFCIITe0nvvvZHee++992TeX4pJQIC9hPWaQ6T41x6skfY7WGPJAGZm/6qgZjIH4AMgOp2Lq32batTkdW/trPt9+qC70DVmSKS2BXF7A1fX9DDnN2FUSpe8y5hID3SZuJMmrcwmoSFm5vD0BDWSNTnCUmZoD1PZtJCDGfIgRUpBMjPkR4rEAwUtFIkHAkKRuCCaxAdRJE5IK/FCGumWF1JLEW5ILfFD2ST9UBaJA6JLPBCQ57xAJcp5NQbtSgBReJSsH8QI5No8ODo+u397ecL3T35IGhcRA4jig8E9qmjAX2OGnAV5ggrxr0ELOaByVmg6B1TGvEYyTvxcKUaMv/ii7xN/VAZYY2dfSHkkPOYY7Kpf7OmLzLfGPIFGd6izWrRUjdYt9Xfo+ULsLpgRKqGtGyadAEIUmnuhXSAwMAXD5j+omZlZRl+X30CWTm2dHwAAAABJRU5ErkJggg==';

var image_up_left = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAMAAAAk2e+/AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAABLFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9PVkEkAAAAY3RSTlMAAQ/6Uc0OEAvHTzL7TcudsMHvdwnfUwMcG8UGiIfTrIkg9QI+/ZTDe460km73LNovCo1vQUuR4Lwk45/OK+3UERTkekziZlSK8QQnoOsFaaXmLqOylvPZLYDRZTUWUpiTDfAuEmiSAAABUklEQVRYw+3WZ2+DMBAG4EtTygrQ7NHsJt1777333vv+/38o6gIMSo0dqf3AK1lIZ/mRjPEJgCBBgvxtQr8WqDKbCiWUG1AnYXU7C7UJqKQSR5oKQwqIPphsYW24nEPjJCYXilf9F+G+qeTmThTP5w8X8gK9NLqOGMGPhD8fdXtBkGihlmlsmF5aqK2xg9FmQe3/DupuEhTpoT41z/V1HVHfxWRRo/6ORBfyjILx9mRo+2MDlS3ggF5q4uP9qzmVNjfOA+EDdDLcWA8IW6FJEJPkCbFI3hCDZEFVPsmC7mQuyYJ0iUuyIAG4JDvEJTkgHskJcUgExC6RECmxQ4REDa24ILsU6wL/rfYHskmX9C87Pfi9aA5cUmnRx/kffDmncSCkat7X342KSzOIuesNR1WSl7GU8Xfbbs9Gyoo0TvRp6Tie8d2TOsyx51UMEiQIS94B13oTqqYgGGoAAAAASUVORK5CYII=';

var image_down_left = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAMAAAAk2e+/AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAABg1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8aT76cAAAAgHRSTlMAafwJfflezc+3WA7Z5Rk6PAvpBNE73kJT89QxZ48czNIv9A1DnI3qKQUaymjT4a7HdVuGf85LR20CVHr+tLBlA0GvYSTYZEnbAcazNPX4yB4GrAgnmL6Bcj4qIVKIe8kdVadIEe27B90bOG/3Er1rYJq1wibyh+4Q5CMzRllMXDo5euMAAAGfSURBVFjD7dblUwJBGAbw5aSlBJRGQERBkLC7u7u7u7veP90jDnaEcdhjP+k9X5h9Zu43O7PLe4eQECH/KGsIaUooOEcLK75LpehH628idSrE+nMANfyQ3MY2BRm0C6mM462tUwJAJtVyUB1WmsoSFZEk46D6TBcYS3UKPpCYawxD5VxHImVD/RHIxMQbGintkGQcppkcOkuutQPYfkDfmjck556ZTSydve2YY5UWk0Mww672VPh+XFqCU8tA+whtL+KOpa+bF3Rh8B4ymDNaSnSzG9IPIpsL34/HTPZfS58auMPYuYNMWcQXOsD3U9ZDOkZkkCvqwSIqUI2WfEDmgiQxRANiIp8GKtDLO6/Znw19oOdXhKoROtEUBr1F5Y9f4dt1XygqKgh6YqcHwMQkQBWICr1H6czTgrpoQde0IGnekJEWNEwLMv/GPDDB/M/fDioVeLYA5GqoYt+xNRY4toJkCiBUG7vTEVxJu2Z549RbqXQuba7uVDZWO66mgw6d7kYaEPvvCb+REIp/srGzLP4aa0n8zKFkKUSIkD+Qb9QrYMvxAbaBAAAAAElFTkSuQmCC';


exports = module.exports = instance;