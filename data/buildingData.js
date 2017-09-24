Game.buildingData = (function () {

	var instance = {};

	var baseProducerBuilding = {
		id: null,
		htmlIdCosts: null,

		type: BUILDING_TYPE.PRODUCER,
		unlocked: false,
		max: Number.MAX_VALUE,
		costType: COST_TYPE.FIXED,
		tier: 0,

		current: 0,
		iconPath: Game.constants.iconPath,
		iconExtension: Game.constants.iconExtension,
		displayNeedsUpdate: true,

		setId: function(id) {
			this.id = id;
			this.htmlIdCosts = {};
			for (var resource in this.cost) {
				this.htmlIdCosts[resource] = id + Game.utils.capitaliseFirst(resource) + 'Cost';
			}
		},

		updateCost: function(count) {
			var buildingDefault = Game.buildingData[this.id];
			var costMultiplier = this.getCostMultiplier();
			for (var costResource in this.cost) {
				this.cost[costResource] = Math.floor(buildingDefault.cost[costResource] * Math.pow(1.1, count) * costMultiplier);
			}
		},

		getCostMultiplier: function() {
			var result = 1;
			if (this.tier === 1) {
				result  *= T1Price;
			}
			if (this.id === BUILDING.Lab) {
				result *= labT1Multi;
			}
			return result;
		}

	};

    // Energy
    instance[BUILDING.CharcoalEngine] = $.extend({}, baseProducerBuilding, {
        name: 'Charcoal Engine',
        desc: 'Burns Charcoal to produce a steady source of Energy.',
		tier: 1,
        resource: 'energy',
        resourcePerSecond: {
            'energy': 2,
            'charcoal': -1
        },
        cost: {
            'metal': 50,
            'gem': 25
        }
    });

    instance[BUILDING.SolarPanel] = $.extend({}, baseProducerBuilding, {
        name: 'Solar Panel',
        desc: 'Gains Energy slowly from the sun without using any resources.',
		tier: 2,
        resource: 'energy',
        resourcePerSecond: {
            'energy': 1.5
        },
        cost: {
            'metal': 30,
            'gem': 35
        }
    });

    instance[BUILDING.MethaneStation] = $.extend({}, baseProducerBuilding, {
        name: 'Methane Power Station',
        desc: 'Burn powerful methane from Venus to satisfy all your power needs.',
		tier: 3,
        resource: 'energy',
        resourcePerSecond: {
            'energy': 23,
            'methane': -6
        },
        cost: {
            'lunarite': 110,
            'titanium': 90
        }
    });

    instance[BUILDING.NuclearStation] = $.extend({}, baseProducerBuilding, {
        name: 'Nuclear Power Station',
        desc: 'Uses fission to create large amounts of power.',
		tier: 4,
        resource: 'energy',
        resourcePerSecond: {
            'energy': 153,
            'uranium': -7
        },
        cost: {
            'lunarite': 20000,
            'titanium': 10000
        }
    });

    instance[BUILDING.Magmatic] = $.extend({}, baseProducerBuilding, {
        name: 'Magmatic Dynamo',
        desc: 'The Magmatic Dynamo is a method of producing power by using lava as a fuel. Because of the extreme temperature of lava, a lot of Energy can be produced at once.',
		tier: 5,
        resource: 'energy',
        resourcePerSecond: {
            'energy': 191,
            'lava': -11
        },
        cost: {
            'lunarite': 25000,
            'gem': 30000,
            'silver': 20000
        }
    });

    instance[BUILDING.FusionReactor] = $.extend({}, baseProducerBuilding, {
        name: 'Fusion Reactor',
        desc: 'In a fusion reaction, Energy is released when two light atomic nuclei are fused together to form one heavier atom. This is the same reaction that occurs in stars and produces a lot of power.',
		tier: 6,
        resource: 'energy',
        resourcePerSecond: {
            'energy': 273,
            'hydrogen': -10,
            'helium': -10
        },
        cost: {
            'lunarite': 30000,
            'titanium': 20000,
            'silicon': 15000
        }
    });

    // Plasma
    instance[BUILDING.Heater] = $.extend({}, baseProducerBuilding, {
        name: 'Super-Heater',
        desc: 'The Super-Heater throws electricity at Hydrogen to turn it into a plasmatic substance.',
		tier: 1,
        resource: 'plasma',
        resourcePerSecond: {
            'energy': -1000,
            'hydrogen': -10,
            'plasma': 1
        },
        cost: {
            'lunarite': 75000,
            'gem': 68000,
            'silicon': 59000
        }
    });

    instance[BUILDING.Plasmatic] = $.extend({}, baseProducerBuilding, {
        name: 'Plasmatic Pit',
        desc: 'This contraption converts Helium into Plasma through firing intensive energy bolts at the gas cloud.',
		tier: 2,
        resource: 'plasma',
        resourcePerSecond: {
            'energy': -8500,
            'helium': -80,
            'plasma': 10
        },
        cost: {
            'lunarite': 810000,
            'silicon': 720000,
            'meteorite': 970
        }
    });

    instance[BUILDING.Bath] = $.extend({}, baseProducerBuilding, {
        name: 'Electron Bath',
        desc: 'Bathing in Electrons. What could go wrong?',
		tier: 3,
        resource: 'plasma',
        resourcePerSecond: {
            'energy': -15000,
            'helium': -100,
            'hydrogen': -100,
            'plasma': 140
        },
        cost: {
            'lava': 6200000,
            'gold': 5900000,
            'meteorite': 12100
        }
    });

    // Uranium
    instance[BUILDING.Grinder] = $.extend({}, baseProducerBuilding, {
        name: 'Grinder',
        desc: 'Pulverizes Uranium for easy transportation out of deep mineshafts.',
		tier: 1,
        resource: 'uranium',
        resourcePerSecond: {
            'uranium': 1
        },
        cost: {
            'lunarite': 4000,
            'titanium': 2000,
            'gold': 2000
        }
    });

    instance[BUILDING.Cubic] = $.extend({}, baseProducerBuilding, {
        name: 'Cubic Teleposer',
        desc: 'This teleposes blocks of rock from far underground to the surface so that Uranium can be mined more easily.',
		tier: 2,
        resource: 'uranium',
        resourcePerSecond: {
            'energy': -40,
            'uranium': 9
        },
        cost: {
            'lunarite': 10000,
            'uranium': 80,
            'oil': 10000
        }
    });

    instance[BUILDING.Enricher] = $.extend({}, baseProducerBuilding, {
        name: 'Uranium Enricher',
        desc: 'The Enricher increases the quality of uranium mined and thus allows more of the uranium in rocks to be used in your company.',
		tier: 3,
        resource: 'uranium',
        resourcePerSecond: {
            'energy': -180,
            'uranium': 61
        },
        cost: {
            'lunarite': 21700,
            'titanium': 23000,
            'silicon': 13500
        }
    });

    instance[BUILDING.Recycler] = $.extend({}, baseProducerBuilding, {
        name: 'Yellowcake Recycler',
        desc: 'Recycles used-up Uranium to provide the resources with a second use. This greatly increases the amount of Uranium you can use per second.',
		tier: 4,
        resource: 'uranium',
        resourcePerSecond: {
            'energy': -436,
            'uranium': 235
        },
        cost: {
            'lunarite': 93100,
            'methane': 47000,
            'meteorite': 830
        }
    });

	instance[BUILDING.PlanetNuke] = $.extend({}, baseProducerBuilding, {
		name: 'Planetary Nuclear Plant',
		desc: 'This huge factory is as large as a planet, fusing together Uranium from common elements.',
		resource: 'uranium',
		tier: 5,
		resourcePerSecond: {
			'energy': -2719,
			'uranium': 2412
		},
		cost: {
			'titanium': 486000,
			'silicon': 266000,
			'ice': 364000
		}
	});

    // Lava
    instance[BUILDING.Crucible] = $.extend({}, baseProducerBuilding, {
        name: 'Heat Resistant Crucible',
        desc: 'You can use a modified crucible to pick up lava and to store it for later use.',
		tier: 1,
        resource: 'lava',
        resourcePerSecond: {
            'lava': 1
        },
        cost: {
            'lunarite': 4000,
            'gem': 7000
        }
    });

    instance[BUILDING.Extractor] = $.extend({}, baseProducerBuilding, {
        name: 'Lava Extractor',
        desc: 'This extracts lava from volcanoes automatically and quickly.',
		tier: 2,
        resource: 'lava',
        resourcePerSecond: {
            'energy': -58,
            'lava': 7
        },
        cost: {
            'lunarite': 16000,
            'titanium': 14000,
            'silicon': 6000
        }
    });

    instance[BUILDING.Extruder] = $.extend({}, baseProducerBuilding, {
        name: 'Igneous Extruder',
        desc: 'Instead of going out and finding lava, it can be more convenient to make it yourself with heat and pressure.',
		tier: 3,
        resource: 'lava',
        resourcePerSecond: {
            'energy': -237,
            'lava': 43
        },
        cost: {
            'lunarite': 69000,
            'titanium': 57000,
            'silicon': 39000
        }
    });

    instance[BUILDING.Veluptuator] = $.extend({}, baseProducerBuilding, {
        name: 'Volcanic Veluptuator',
        desc: 'A melting pot of misery, pouring lava out from mined rock.',
		tier: 4,
        resource: 'lava',
        resourcePerSecond: {
            'energy': -689,
            'lava': 187
        },
        cost: {
            'lunarite': 298000,
            'gold': 121000,
            'meteorite': 750
        }
    });

	instance[BUILDING.Condensator] = $.extend({}, baseProducerBuilding, {
		name: 'Jupitonian Condensator',
		desc: 'Condense gases from the heart of Jupiter into liquid magma.',
		tier: 5,
		resource: 'lava',
		resourcePerSecond: {
			'energy': -4142,
			'lava': 2103
		},
		cost: {
			'lunarite': 288000,
			'gem': 210000,
			'ice': 238000
		}
	});

    /********************
     * Earth Resources  *
     ********************/

    // Oil
    instance[BUILDING.Pump] = $.extend({}, baseProducerBuilding, {
        name: 'Small Pump',
        desc: 'Build a small pump to extract Oil from the ground.',
		tier: 1,
        resource: 'oil',
        resourcePerSecond: {
            'oil': 1
        },
        cost: {
            'metal': 60,
            'gem': 20
        }
    });

    instance[BUILDING.Pumpjack] = $.extend({}, baseProducerBuilding, {
        name: 'Pumpjack',
        desc: 'Pumpjacks are much bigger than small pumps and produce Oil on an industrial scale but they require a lot of Energy.',
		tier: 2,
        resource: 'oil',
        resourcePerSecond: {
            'energy': -4,
            'oil': 10
        },
        cost: {
            'metal': 250,
            'gem': 80,
            'oil': 50
        }
    });

    instance[BUILDING.OilField] = $.extend({}, baseProducerBuilding, {
        name: 'Oil Field',
        desc: 'Oil Fields are large open spaces, usually found in deserts where vast oil wells can be found under the ground.',
		tier: 3,
        resource: 'oil',
        resourcePerSecond: {
            'energy': -17,
            'oil': 63
        },
        cost: {
            'lunarite': 2400,
            'titanium': 2700,
            'silicon': 3900
        }
    });

    instance[BUILDING.OilRig] = $.extend({}, baseProducerBuilding, {
        name: 'Offshore Rig',
        desc: 'Offshore Rigs are mega structures floating in the oceans, extracting Oil from under the sea-beds.',
		tier: 4,
        resource: 'oil',
        resourcePerSecond: {
            'energy': -44,
            'oil': 246
        },
        cost: {
            'lunarite': 19400,
            'titanium': 16800,
            'meteorite': 760
        }
    });

	instance[BUILDING.Fossilator] = $.extend({}, baseProducerBuilding, {
		name: 'Fossilator 9000',
		desc: 'Much better than the 8000 version, this fossilator reverses the fossil fuel cycle. Instead of burning, it creates them from carbon in the air.',
		tier: 5,
		resource: 'oil',
		resourcePerSecond: {
			'energy': -258,
			'oil': 2627
		},
		cost: {
			'uranium': 110000,
			'charcoal': 96000,
			'lava': 167000
		}
	});

    // Metal
    instance[BUILDING.Miner] = $.extend({}, baseProducerBuilding, {
        name: 'Miner',
        desc: 'Build a pickaxe for your miner.',
		tier: 1,
        resource: 'metal',
        unlocked: true,
        resourcePerSecond: {
            'metal': 1
        },
        cost: {
            'metal': 10,
            'wood': 5
        }
    });

    instance[BUILDING.HeavyDrill] = $.extend({}, baseProducerBuilding, {
        name: 'Heavy Drill',
        desc: 'Heavy Drills mine Metal at mass.',
		tier: 2,
        resource: 'metal',
        resourcePerSecond: {
            'energy': -2,
            'metal': 8
        },
        cost: {
            'metal': 160,
            'gem': 60,
            'oil': 50
        }
    });

    instance[BUILDING.GigaDrill] = $.extend({}, baseProducerBuilding, {
        name: 'Giga Drill',
        desc: 'Giga Drills extract Metal at colossal speeds.',
		tier: 3,
        resource: 'metal',
        resourcePerSecond: {
            'energy': -9,
            'metal': 108
        },
        cost: {
            'lunarite': 2800,
            'gem': 3400,
            'silicon': 4100
        }
    });

    instance[BUILDING.QuantumDrill] = $.extend({}, baseProducerBuilding, {
        name: 'Quantum Drill',
        desc: 'Quantum Drills bend the space-time continuum to get metal faster than physically possible.',
		tier: 4,
        resource: 'metal',
        resourcePerSecond: {
            'energy': -24,
            'metal': 427
        },
        cost: {
            'lunarite': 29000,
            'gold': 18700,
            'meteorite': 900
        }
    });

	instance[BUILDING.MultiDrill] = $.extend({}, baseProducerBuilding, {
		name: 'Multiverse Drill',
		desc: 'Drills metal from alternate realities where metal is plentiful.',
		tier: 5,
		resource: 'metal',
		resourcePerSecond: {
			'energy': -131,
			'metal': 4768
		},
		cost: {
			'titanium': 184000,
			'gold': 133000,
			'oil': 170000
		}
	});

    // Gem
    instance[BUILDING.GemMiner] = $.extend({}, baseProducerBuilding, {
        name: 'Gem Miner',
        desc: 'Build an improved pickaxe to mine Gems.',
		tier: 1,
        resource: 'gem',
        unlocked: true,
        resourcePerSecond: {
            'gem': 1
        },
        cost: {
            'metal': 15,
            'gem': 10
        }
    });

    instance[BUILDING.AdvancedDrill] = $.extend({}, baseProducerBuilding, {
        name: 'Advanced Drill',
        desc: 'Advanced Drills mine gem at mass. Because of the toughness of the drill needed it is slower than the heavy drill.',
		tier: 2,
        resource: 'gem',
        resourcePerSecond: {
            'energy': -2,
            'gem': 4
        },
        cost: {
            'metal': 120,
            'gem': 200,
            'oil': 60
        }
    });

    instance[BUILDING.DiamondDrill] = $.extend({}, baseProducerBuilding, {
        name: 'Diamond Encrusted Drill',
        desc: 'The Diamond Encrusted Drill is one of the strongest drills in the solar system, and as such, can collect Gems faster than anything before it.',
		tier: 3,
        resource: 'gem',
        resourcePerSecond: {
            'energy': -15,
            'gem': 89
        },
        cost: {
            'lunarite': 3400,
            'gem': 8000,
            'silicon': 4500
        }
    });

    instance[BUILDING.CarbyneDrill] = $.extend({}, baseProducerBuilding, {
        name: 'Carbyne Drill',
        desc: 'Carbyne Drills one of the strongest drills in the solar system, and as such, can collect Gems faster than anything before it.',
		tier: 4,
        resource: 'gem',
        resourcePerSecond: {
            'energy': -40,
            'gem': 358
        },
        cost: {
            'lunarite': 21000,
            'gem': 27000,
            'meteorite': 800
        }
    });

	instance[BUILDING.DiamondChamber] = $.extend({}, baseProducerBuilding, {
		name: 'Diamond Accretion Chamber',
		desc: 'This special container condenses carbon dioxide gas into diamonds, creating gems at a faster rate than any drill.',
		tier: 5,
		resource: 'gem',
		resourcePerSecond: {
			'energy': -260,
			'gem': 3747
		},
		cost: {
			'uranium': 181000,
			'charcoal': 185000,
			'meteorite': 12500
		}
	});

    // Charcoal
    instance[BUILDING.Woodburner] = $.extend({}, baseProducerBuilding, {
        name: 'Woodburner',
        desc: 'Build a shovel for your woodburner.',
		tier: 1,
        resource: 'charcoal',
        resourcePerSecond: {
            'wood': -2,
            'charcoal': 1
        },
        cost: {
            'metal': 10,
            'wood': 5
        }
    });

    instance[BUILDING.Furnace] = $.extend({}, baseProducerBuilding, {
        name: 'Furnace',
        desc: 'Furnaces use electric heaters to produce heat to turn Wood into Charcoal. Because of the increased heat, the process is more efficient.',
		tier: 2,
        resource: 'charcoal',
        resourcePerSecond: {
            'energy': -3,
            'wood': -6,
            'charcoal': 4
        },
        cost: {
            'metal': 80,
            'wood': 40,
            'oil': 100
        }
    });

    instance[BUILDING.Kiln] = $.extend({}, baseProducerBuilding, {
        name: 'Industrial Kiln',
        desc: 'These large kilns are much for effective than previous methods of creating charcoal and use less wood to make the same amount as a furnace.',
		tier: 3,
        resource: 'charcoal',
        resourcePerSecond: {
            'energy': -13,
            'wood': -56,
            'charcoal': 53
        },
        cost: {
            'lunarite': 3500,
            'gem': 6200,
            'silicon': 3800
        }
    });

    instance[BUILDING.Fryer] = $.extend({}, baseProducerBuilding, {
        name: 'Forest Fryer',
        desc: 'Forests? What forests?',
		tier: 4,
        resource: 'charcoal',
        resourcePerSecond: {
            'energy': -34,
            'wood': -148,
            'charcoal': 210
        },
        cost: {
            'lunarite': 15800,
            'lava': 12500,
            'meteorite': 560
        }
    });

	instance[BUILDING.MicroPollutor] = $.extend({}, baseProducerBuilding, {
		name: 'Microverse Pollutor',
		desc: 'Using Nano-technology, tiny universes can be created, filled with toxic gases from charcoal production and simply deleted. Cross-dimensional pollution at a completely new level!',
		tier: 5,
		resource: 'charcoal',
		resourcePerSecond: {
			'energy': -187,
			'wood': -950,
			'charcoal': 2267
		},
		cost: {
			'metal': 133000,
			'wood': 189000,
			'lava': 160000
		}
	});

    // Wood
    instance[BUILDING.Woodcutter] = $.extend({}, baseProducerBuilding, {
        name: 'Woodcutter',
        desc: 'Build an axe for your woodcutter.',
		tier: 1,
        resource: 'wood',
        unlocked: true,
        resourcePerSecond: {
            'wood': 1
        },
        cost: {
            'metal': 10,
            'wood': 5
        }
    });

    instance[BUILDING.LaserCutter] = $.extend({}, baseProducerBuilding, {
        name: 'Laser Cutter',
        desc: 'Laser Cutters slice trees (and fingers) quicker than axes and produce a lot more wood.',
		tier: 2,
        resource: 'wood',
        resourcePerSecond: {
            'energy': -4,
            'wood': 6
        },
        cost: {
            'metal': 50,
            'gem': 90,
            'oil': 40
        }
    });

    instance[BUILDING.Deforester] = $.extend({}, baseProducerBuilding, {
        name: 'Mass Deforester',
        desc: 'This machine is the reason we\'re losing our rainforests. At least we get lots of wood!',
		tier: 3,
        resource: 'wood',
        resourcePerSecond: {
            'energy': -16,
            'wood': 74
        },
        cost: {
            'lunarite': 3000,
            'titanium': 2700,
            'silicon': 2500
        }
    });

    instance[BUILDING.Infuser] = $.extend({}, baseProducerBuilding, {
        name: 'Biomass Infuser',
        desc: 'Creates Wood using old, useless materials found everywhere on Earth by crushing them and packing what remains as densely as possible until it can be used as Wood again.',
		tier: 4,
        resource: 'wood',
        resourcePerSecond: {
            'energy': -43,
            'wood': 297
        },
        cost: {
            'lunarite': 16000,
            'oil': 31200,
            'meteorite': 490
        }
    });

	instance[BUILDING.Forest] = $.extend({}, baseProducerBuilding, {
		name: 'Russian Forest',
		desc: 'The great Russian forests span thousands of miles. More than enough for at least your lifetime. Let the younger generation deal with running out.',
		tier: 5,
		resource: 'wood',
		resourcePerSecond: {
			'energy': -244,
			'wood': 3278
		},
		cost: {
			'metal': 122000,
			'gem': 151000,
			'hydrogen': 183000
		}
	});

    // Silicon
    instance[BUILDING.Blowtorch] = $.extend({}, baseProducerBuilding, {
        name: 'Empowered Blowtorch',
        desc: 'This type of blowtorch instantly turns sand into Silicon, but only on a small scale. To make it, extraterrestrial resources are required.',
		tier: 1,
        resource: 'silicon',
        resourcePerSecond: {
            'silicon': 1
        },
        cost: {
            'lunarite': 150,
            'titanium': 30
        }
    });

    instance[BUILDING.Scorcher] = $.extend({}, baseProducerBuilding, {
        name: 'Seaside Scorcher',
        desc: 'This tool almost melts parts of beaches to get silicon at a larger scale.',
		tier: 2,
        resource: 'silicon',
        resourcePerSecond: {
            'energy': -18,
            'silicon': 9
        },
        cost: {
            'lunarite': 500,
            'gem': 1200,
            'oil': 1600
        }
    });

    instance[BUILDING.Annihilator] = $.extend({}, baseProducerBuilding, {
        name: 'Beach Annihilator',
        desc: 'This weapon of mass destruction has been re-labelled and now hovers above coast-lines, or what is now left of them.',
		tier: 3,
        resource: 'silicon',
        resourcePerSecond: {
            'energy': -53,
            'silicon': 40
        },
        cost: {
            'lunarite': 3000,
            'gem': 8300,
            'silver': 2400
        }
    });

    instance[BUILDING.Desert] = $.extend({}, baseProducerBuilding, {
        name: 'Desert Destroyer',
        desc: 'This large ship orbits around the planet, focused in the Sahara Desert, tearing up sand from Earth and turning it into Silicon under intense heat.',
		tier: 4,
        resource: 'silicon',
        resourcePerSecond: {
            'energy': -138,
            'silicon': 157
        },
        cost: {
            'lunarite': 20000,
            'silicon': 17700,
            'meteorite': 400
        }
    });

	instance[BUILDING.Tardis] = $.extend({}, baseProducerBuilding, {
		name: 'Time And Relative Dimensions In Sand',
		desc: 'The TARDIS, for short, harnesses the power of stars from far away in space-time to heat sand into Silicon at record speeds.',
		tier: 5,
		resource: 'silicon',
		resourcePerSecond: {
			'energy': -746,
			'silicon': 1487
		},
		cost: {
			'titanium': 204000,
			'silicon': 205000,
			'meteorite': 17800
		}
	});

    /******************************
     * Inner Planetary Resources  *
     ******************************/

    // Lunarite
    instance[BUILDING.MoonWorker] = $.extend({}, baseProducerBuilding, {
        name: 'Native Moon Worker',
        desc: 'Bribe local workers to mine your Lunarite.',
		tier: 1,
        resource: 'lunarite',
        resourcePerSecond: {
            'lunarite': 1
        },
        cost: {
            'gem': 500
        }
    });

    instance[BUILDING.MoonDrill] = $.extend({}, baseProducerBuilding, {
        name: 'Low-Gravity Drill',
        desc: 'These drills practically float!',
		tier: 2,
        resource: 'lunarite',
        resourcePerSecond: {
            'energy': -20,
            'lunarite': 10
        },
        cost: {
            'metal': 1000,
            'gem': 600,
            'oil': 400
        }
    });

    instance[BUILDING.MoonQuarry] = $.extend({}, baseProducerBuilding, {
        name: 'Moon Quarry',
        desc: 'This quarry tears up the surface of the moon so much that it can be seen from Earth.',
		tier: 3,
        resource: 'lunarite',
        resourcePerSecond: {
            'energy': -70,
            'lunarite': 53
        },
        cost: {
            'lunarite': 8000,
            'gem': 5000,
            'silicon': 3500
        }
    });

    instance[BUILDING.PlanetExcavator] = $.extend({}, baseProducerBuilding, {
        name: 'Planetary Excavator',
        desc: 'This large machine dives deep into the Earth to find large pools of Lunarite found near the core. This is originally where the metal on the Moon comes from.',
		tier: 4,
        resource: 'lunarite',
        resourcePerSecond: {
            'energy': -182,
            'lunarite': 207
        },
        cost: {
            'titanium': 45000,
            'ice': 37000,
            'meteorite': 500
        }
    });

	instance[BUILDING.Cloner] = $.extend({}, baseProducerBuilding, {
		name: 'Moon Cloner',
		desc: 'And you wondered why we have a hundred moons in the sky?',
		tier: 5,
		resource: 'lunarite',
		resourcePerSecond: {
			'energy': -1216,
			'lunarite': 2122
		},
		cost: {
			'titanium': 204000,
			'gold': 150000,
			'methane': 195000
		}
	});

    // Methane
    instance[BUILDING.Vacuum] = $.extend({}, baseProducerBuilding, {
        name: 'Vacuum Cleaner',
        desc: 'Sucks in methane and cleans the planet at the same time!',
		tier: 1,
        resource: 'methane',
        resourcePerSecond: {
            'methane': 1
        },
        cost: {
            'lunarite': 50
        }
    });

    instance[BUILDING.SuctionExcavator] = $.extend({}, baseProducerBuilding, {
        name: 'Suction Excavator',
        desc: 'Sucks more than anything!',
		tier: 2,
        resource: 'methane',
        resourcePerSecond: {
            'energy': -16,
            'methane': 8
        },
        cost: {
            'lunarite': 10000,
            'gem': 800,
            'oil': 600
        }
    });

    instance[BUILDING.SpaceCow] = $.extend({}, baseProducerBuilding, {
        name: 'Space Cow Plantation',
        desc: 'These hold cows genetically moodified to produce methane constantly',
		tier: 3,
        resource: 'methane',
        resourcePerSecond: {
            'energy': -49,
            'methane': 37
        },
        cost: {
            'lunarite': 10000,
            'titanium': 9000,
            'silicon': 4100
        }
    });

    instance[BUILDING.Vent] = $.extend({}, baseProducerBuilding, {
        name: 'Hydrothermal Vent',
        desc: 'Collect gas from deep sea vents on the ocean floor of Titan.',
		tier: 4,
        resource: 'methane',
        resourcePerSecond: {
            'energy': -132,
            'methane': 149
        },
        cost: {
            'lunarite': 52000,
            'helium': 47000,
            'meteorite': 390
        }
    });

	instance[BUILDING.InterCow] = $.extend({}, baseProducerBuilding, {
		name: 'Interstellar Cow',
		desc: 'An interdimoonsional bovine.',
		tier: 5,
		resource: 'methane',
		resourcePerSecond: {
			'energy': -899,
			'methane': 1393
		},
		cost: {
			'lunarite': 140000,
			'gold': 202000,
			'hydrogen': 158000
		}
	});

    // Titanium
    instance[BUILDING.Explorer] = $.extend({}, baseProducerBuilding, {
        name: 'Explorer',
        desc: 'Hire explorers to search for Titanium on the surface, uncovered by winds on Mars.',
		tier: 1,
        resource: 'titanium',
        resourcePerSecond: {
            'titanium': 1
        },
        cost: {
            'gem': 1000
        }
    });

    instance[BUILDING.LunariteDrill] = $.extend({}, baseProducerBuilding, {
        name: 'Lunarite Drill',
        desc: 'These Lunarite Drills are extremely powerful, needed to mine out Titanium from inside Mars\' crust.',
		tier: 2,
        resource: 'titanium',
        resourcePerSecond: {
            'energy': -13,
            'titanium': 9
        },
        cost: {
            'lunarite': 200,
            'gem': 800,
            'oil': 1000
        }
    });

    instance[BUILDING.PentaDrill] = $.extend({}, baseProducerBuilding, {
        name: 'Penta-Drill',
        desc: 'This is a mining machine modified to have 5 drills on its face. This allows for a massive increase in resources gained per second.',
		tier: 3,
        resource: 'titanium',
        resourcePerSecond: {
            'energy': -46,
            'titanium': 49
        },
        cost: {
            'lunarite': 14000,
            'gem': 11000,
            'silicon': 5600
        }
    });

    instance[BUILDING.TitanDrill] = $.extend({}, baseProducerBuilding, {
        name: 'Drill of Titans',
        desc: 'This mighty drill is said to have been wielded by Titans themselves, many millennia ago.',
		tier: 4,
        resource: 'titanium',
        resourcePerSecond: {
            'energy': -123,
            'titanium': 197
        },
        cost: {
            'lunarite': 63000,
            'gold': 27000,
            'meteorite': 600
        }
    });

	instance[BUILDING.Club] = $.extend({}, baseProducerBuilding, {
		name: 'David Guetta\'s Club',
		desc: 'You shoot me down, but I won\'t fall. I am Titanium.',
		tier: 5,
		resource: 'titanium',
		resourcePerSecond: {
			'energy': -690,
			'titanium': 2106
		},
		cost: {
			'uranium': 175000,
			'wood': 164000,
			'helium': 156000
		}
	});

    // Gold
    instance[BUILDING.Droid] = $.extend({}, baseProducerBuilding, {
        name: 'Rocket Droid',
        desc: 'Powered by Methane, this droid scouts the asteroids for gold deposits.',
		tier: 1,
        resource: 'gold',
        resourcePerSecond: {
            'gold': 1
        },
        cost: {
            'lunarite': 200,
            'methane': 50
        }
    });

    instance[BUILDING.Destroyer] = $.extend({}, baseProducerBuilding, {
        name: 'Asteroid Destroyer',
        desc: 'Mines through asteroids to find Gold. It is much more effective than the simple droid.',
		tier: 2,
        resource: 'gold',
        resourcePerSecond: {
            'energy': -19,
            'gold': 8
        },
        cost: {
            'lunarite': 500,
            'gem': 1500,
            'oil': 1000
        }
    });

    instance[BUILDING.DeathStar] = $.extend({}, baseProducerBuilding, {
        name: 'Death Star Jr',
        desc: 'That\'s no moon! That\'s a Space Station! This cuts through asteroids to expose all of the Gold in the centers.',
		tier: 3,
        resource: 'gold',
        resourcePerSecond: {
            'energy': -81,
            'gold': 51
        },
        cost: {
            'lunarite': 17000,
            'silver': 11500,
            'silicon': 8200
        }
    });

    instance[BUILDING.Actuator] = $.extend({}, baseProducerBuilding, {
        name: 'Chronal Actuator',
        desc: 'Speeds up time through quantum physics in order to produce even more Gold.',
		tier: 4,
        resource: 'gold',
        resourcePerSecond: {
            'energy': -223,
            'gold': 211
        },
        cost: {
            'lunarite': 61000,
            'helium': 15700,
            'meteorite': 600
        }
    });

	instance[BUILDING.Philosopher] = $.extend({}, baseProducerBuilding, {
		name: 'Philosopher\'s Stone',
		desc: 'Transmutation has progressed to being able to turn thin air into gold!',
		tier: 5,
		resource: 'gold',
		resourcePerSecond: {
			'energy': -1324,
			'gold': 2422
		},
		cost: {
			'metal': 208000,
			'silver': 167000,
			'meteorite': 18000
		}
	});

    // Silver
    instance[BUILDING.Scout] = $.extend({}, baseProducerBuilding, {
        name: 'Scout Ship',
        desc: 'The Scout Ship searches through the asteroid field for pieces of silver embedded in asteroids.',
		tier: 1,
        resource: 'silver',
        resourcePerSecond: {
            'silver': 1
        },
        cost: {
            'lunarite': 100,
            'titanium': 20
        }
    });

    instance[BUILDING.SpaceLaser] = $.extend({}, baseProducerBuilding, {
        name: 'Interplanetary Laser',
        desc: 'Cuts through asteroids to find silver deposits in their cores.',
		tier: 2,
        resource: 'silver',
        resourcePerSecond: {
            'energy': -24,
            'silver': 13
        },
        cost: {
            'lunarite': 350,
            'gem': 900,
            'oil': 1200
        }
    });

    instance[BUILDING.Bertha] = $.extend({}, baseProducerBuilding, {
        name: 'Big Bertha',
        desc: 'This large, space drill, named after the World War One Howitzer built almost a millennium ago, is a silver seeking machine specially designed for mining asteroids.',
		tier: 3,
        resource: 'silver',
        resourcePerSecond: {
            'energy': -65,
            'silver': 53
        },
        cost: {
            'lunarite': 19500,
            'titanium': 18200,
            'silicon': 11000
        }
    });

    instance[BUILDING.Cannon] = $.extend({}, baseProducerBuilding, {
        name: 'Atomic Cannon',
        desc: 'This powerful cannon orbits Neptune and can atomise the surface of asteroids, revealing the silver within.',
		tier: 4,
        resource: 'silver',
        resourcePerSecond: {
            'energy': -170,
            'silver': 208
        },
        cost: {
            'lunarite': 85100,
            'oil': 93800,
            'meteorite': 520
        }
    });

	instance[BUILDING.Werewolf] = $.extend({}, baseProducerBuilding, {
		name: 'Dead Werewolf Finder',
		desc: 'The Silver bullets used to kill werewolves are made from silver that has been compressed well over 1000 times. Extracting them will prove beneficial for your production.',
		tier: 5,
		resource: 'silver',
		resourcePerSecond: {
			'energy': -1008,
			'silver': 2261
		},
		cost: {
			'uranium': 165000,
			'gem': 209000,
			'methane': 170000
		}
	});

    /******************************
     * Outer Planetary Resources  *
     ******************************/

    // Hydrogen
    instance[BUILDING.Collector] = $.extend({}, baseProducerBuilding, {
        name: 'Hydrogen Collector',
        desc: 'This collector travels around Jupiter seeking Hydrogen to store to bring back to Earth.',
		tier: 1,
        resource: 'hydrogen',
        resourcePerSecond: {
            'hydrogen': 1
        },
        cost: {
            'lunarite': 6000,
            'titanium': 4800
        }
    });

    instance[BUILDING.Magnet] = $.extend({}, baseProducerBuilding, {
        name: 'Gaseous Magnet',
        desc: 'The magnet attracts the Hydrogen to it to increase the amount collected per second.',
		tier: 2,
        resource: 'hydrogen',
        resourcePerSecond: {
            'energy': -63,
            'hydrogen': 5
        },
        cost: {
            'lunarite': 10800,
            'titanium': 9600,
            'gold': 6600
        }
    });

    instance[BUILDING.ECell] = $.extend({}, baseProducerBuilding, {
        name: 'Electrolytic Cell',
        desc: 'These are made here on Earth and can turn water into hydrogen with a constant supply of Energy.',
		tier: 3,
        resource: 'hydrogen',
        resourcePerSecond: {
            'energy': -234,
            'hydrogen': 28
        },
        cost: {
            'silver': 37200,
            'gold': 34200,
            'silicon': 25800
        }
    });

    instance[BUILDING.Hindenburg] = $.extend({}, baseProducerBuilding, {
        name: 'Hindenburg Excavation',
        desc: 'Somehow, it works.',
		tier: 4,
        resource: 'hydrogen',
        resourcePerSecond: {
            'energy': -613,
            'hydrogen': 113
        },
        cost: {
            'lunarite': 172000,
            'methane': 134000,
            'meteorite': 710
        }
    });

	instance[BUILDING.Harvester] = $.extend({}, baseProducerBuilding, {
		name: 'Star Harvester',
		desc: '\'Stealing\' is such a strong word. I prefer \'borrowing without return\' when we harvest the outer regions of stars.',
		tier: 5,
		resource: 'hydrogen',
		resourcePerSecond: {
			'energy': -3562,
			'hydrogen': 3562
		},
		cost: {
			'lunarite': 250000,
			'wood': 184000,
			'oil': 146000
		}
	});

    // Helium
    instance[BUILDING.Drone] = $.extend({}, baseProducerBuilding, {
        name: 'Helium Drone',
        desc: 'The Helium Drone scouts out the area on Saturn and picks out spots high in Helium which are then mined slowly by it.',
		tier: 1,
		resource: 'helium',
        resourcePerSecond: {
            'helium': 1
        },
        cost: {
            'lunarite': 8400,
            'silicon': 6000
        }
    });

    instance[BUILDING.Tanker] = $.extend({}, baseProducerBuilding, {
        name: 'Helium Tanker',
        desc: 'This huge tanker holds large amounts of Helium and transports it from Saturn to Earth through the vacuum of space.',
		tier: 2,
        resource: 'helium',
        resourcePerSecond: {
            'energy': -72,
            'helium': 11
        },
        cost: {
            'lunarite': 12600,
            'titanium': 10200,
            'silicon': 8400
        }
    });

    instance[BUILDING.Compressor] = $.extend({}, baseProducerBuilding, {
        name: 'Morphic Compressor',
        desc: 'The Compressor packs helium densely into a small space so that it can be easily transported back to Earth.',
		tier: 3,
        resource: 'helium',
        resourcePerSecond: {
            'energy': -248,
            'helium': 57
        },
        cost: {
            'lunarite': 63000,
            'titanium': 43800,
            'silicon': 35400
        }
    });

    instance[BUILDING.Skimmer] = $.extend({}, baseProducerBuilding, {
        name: 'Gas Giant Skimmer',
        desc: 'Flying into Gas Giants\' atmospheres with a big bucket is the best plan we\'ve had yet!',
		tier: 4,
        resource: 'helium',
        resourcePerSecond: {
            'energy': -670,
            'helium': 232
        },
        cost: {
            'lunarite': 255000,
            'titanium': 173000,
            'meteorite': 770
        }
    });

	instance[BUILDING.Cage] = $.extend({}, baseProducerBuilding, {
		name: 'Caged Star',
		desc: 'A contained miniature version of the sun uses nuclear fusion to create massive amounts of helium.',
		tier: 5,
		resource: 'helium',
		resourcePerSecond: {
			'energy': -4075,
			'helium': 2369
		},
		cost: {
			'lunarite': 171000,
			'silicon': 165000,
			'meteorite': 18600
		}
	});

    // Ice
    instance[BUILDING.IcePick] = $.extend({}, baseProducerBuilding, {
        name: 'Ice Pickaxe',
        desc: 'The Ice Pickaxe is the simplest way of mining frozen water, and although it is the cheapest, it is the slowest.',
		tier: 1,
        resource: 'ice',
        resourcePerSecond: {
            'ice': 1
        },
        cost: {
            'lunarite': 17800,
            'gem': 19300
        }
    });

    instance[BUILDING.IceDrill] = $.extend({}, baseProducerBuilding, {
        name: 'Ice Drill',
        desc: 'The Ice Drill is more effective than the Pickaxe and gains much more Ice every second. However, it does use electricity.',
		tier: 2,
        resource: 'ice',
        resourcePerSecond: {
            'energy': -83,
            'ice': 9
        },
        cost: {
            'lunarite': 23900,
            'titanium': 21200,
            'silicon': 19600
        }
    });

    instance[BUILDING.Freezer] = $.extend({}, baseProducerBuilding, {
        name: 'Ocean Freezer',
        desc: 'With advanced technology, you are now able to turn Earth\'s water into high-quality Ice, previously only found on Pluto.',
		tier: 3,
        resource: 'ice',
        resourcePerSecond: {
            'energy': -397,
            'ice': 65
        },
        cost: {
            'lunarite': 117000,
            'titanium': 86000,
            'silicon': 73000
        }
    });

    instance[BUILDING.MrFreeze] = $.extend({}, baseProducerBuilding, {
        name: 'Mr Freeze',
        desc: 'This robot is the coolest guy in the solar system.',
		tier: 4,
        resource: 'ice',
        resourcePerSecond: {
            'energy': -1135,
            'ice': 278
        },
        cost: {
            'wood': 379000,
            'helium': 14000,
            'meteorite': 1500
        }
    });

	instance[BUILDING.Overexchange] = $.extend({}, baseProducerBuilding, {
		name: 'Overexchange Condenser',
		desc: 'Drain heat out of the ingredients so fast that you\'re not sure how to process it safely, but you managed to do it properly anyway.',
		tier: 5,
		resource: 'ice',
		resourcePerSecond: {
			'energy': -7397,
			'ice': 2973
		},
		cost: {
			'metal': 210000,
			'silver': 188000,
			'helium': 205000
		}
	});

    // Meteorite
    instance[BUILDING.Printer] = $.extend({}, baseProducerBuilding, {
        name: 'Meteorite Printer',
        desc: 'Construct an automated way of producing meteorite without you having to do anything.',
		tier: 1,
        resource: 'meteorite',
        resourcePerSecond: {
            'plasma': -3,
            'meteorite': 1
        },
        cost: {
            'lunarite': 100000,
            'silicon': 60000
        }
    });

    instance[BUILDING.Web] = $.extend({}, baseProducerBuilding, {
        name: 'Meteorite Web',
        desc: 'The Meteorite Web uses nano-fibres made while submerged in highly radioactive liquids to become strong enough to physically catch meteors from the Asteroid Belt. Plasma is required to refine the asteroids into Meteorite Ore, which can be usable.',
		tier: 2,
        resource: 'meteorite',
        resourcePerSecond: {
            'plasma': -21,
            'meteorite': 8
        },
        cost: {
            'lunarite': 940000,
            'uranium': 490000,
            'silicon': 510000
        }
    });

    // Research
    instance[BUILDING.Lab] = $.extend({}, baseProducerBuilding, {
        name: 'Home Science Kit',
        desc: 'Build a small laboratory of your very own to start producing science. Each one produces 0.1 science per second.',
		tier: 1,
        resource: 'science',
        resourcePerSecond: {
            'science': 0.1
        },
        cost: {
            'metal': 20,
            'gem': 15,
            'wood': 10
        }
    });

    instance[BUILDING.LabT2] = $.extend({}, baseProducerBuilding, {
        name: 'High School Science',
        desc: 'Build a more effective laboratory to continue your quest into the realm of science at a significantly faster speed. Each one produces 1 science per second.',
		tier: 2,
        resource: 'science',
        resourcePerSecond: {
            'science': 1
        },
        cost: {
            'metal': 1000,
            'gem': 200,
            'wood': 500
        }
    });

    instance[BUILDING.LabT3] = $.extend({}, baseProducerBuilding, {
        name: 'University Laboratory',
        desc: 'Build an even better version of the old laboratory to further your exploration of the realm of science. Each one produces 10 science per second.',
		tier: 3,
        resource: 'science',
        resourcePerSecond: {
            'science': 10
        },
        cost: {
            'metal': 17000,
            'gem': 4700,
            'wood': 9600
        }
    });

	instance[BUILDING.LabT4] = $.extend({}, baseProducerBuilding, {
		name: 'Scientific Observatory',
		desc: 'Create an observatory to gaze upon the stars and acquire knowledge from them. Each one produces 100 science per second.',
		tier: 4,
		resource: 'science',
		resourcePerSecond: {
			'science': 100
		},
		cost: {
			'metal': 610000,
			'gem': 370000,
			'wood': 926000
		}
	});

	instance[BUILDING.LabT5] = $.extend({}, baseProducerBuilding, {
		name: 'Space Scientific Satellite Station',
		desc: 'From outside Earth\'s orbit, the universe can be understood much more efficiently without an atmosphere obstructing the lab\'s view. Each one produces 1000 science per second.',
		tier: 5,
		resource: 'science',
		resourcePerSecond: {
			'science': 1000
		},
		cost: {
			'metal': 12400000,
			'gem': 7300000,
			'wood': 15900000
		}
	});

    // Solar System
    instance[BUILDING.ChemicalPlant] = $.extend({}, baseProducerBuilding, {
        name: 'Chemical Plant',
        desc: 'Chemical plants are used to make rocket fuel automatically.',
		tier: 1,
        resource: 'rocketFuel',
        resourcePerSecond: {
            'rocketFuel': 0.2
        },
        cost: {
            'metal': 1000,
            'gem': 750,
            'oil': 500
        }
    });

    instance[BUILDING.Oxidisation] = $.extend({}, baseProducerBuilding, {
        name: 'Oxidisation Chamber',
        desc: 'Oxidisation Chambers make rocket fuel faster and more efficiently than chemical plants.',
		tier: 2,
        resource: 'rocketFuel',
        resourcePerSecond: {
            'rocketFuel': 1.5
        },
        cost: {
            'metal': 12000,
            'gem': 8300,
            'oil': 6800
        }
    });

    instance[BUILDING.Hydrazine] = $.extend({}, baseProducerBuilding, {
        name: 'Hydrazine Catalyst',
        desc: 'These speed up the chemical reactions needed to make rocket fuel by using greenhouse gases such as methane.',
		tier: 3,
        resource: 'rocketFuel',
        resourcePerSecond: {
            'rocketFuel': 20
        },
        cost: {
            'titanium': 140000,
            'silicon': 96300,
            'gold': 78600
        }
    });
    
    return instance;
}());
