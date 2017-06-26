﻿'use strict';

const path  = require('path');
const pkg   = require('./package.json');

const target = {
    type: 'classical-module',
    es: 'es5',
    module: 'none',
    env: 'web',
};

const dir = {
    src: 'src',
    pkg: 'dist',
    built: 'exports',
    doc: 'docs',
    task: 'tasks',
    test: 'tests',
    types: '@types',
    temp: '.temp',
    external: 'external',
    script: 'scripts',
};

const external_rearrange = {
    root: `${dir.external}`,
    ignore_modules: [
        '^@types',
    ],
    module_adjuster: {
    },
};

const main = {
    basename: 'cdp.lazyload',
    bundle_d_ts: 'cdp.lazyload.d.ts',
    namespace: 'cdp',
};

const built_cleanee = {
    ts: ['**/*.js', '**/*.d.ts', '!**/_dev.dependencies.d.ts', '**/*.map'],
};

const banner = {
    fileName: 'BANNER',
    d_ts_desc: '\n * This file is generated by the CDP package build process.',
};

const required_tasks = [
    'banner.js',
    'bundle.js',
    'clean.js',
    'coverage.js',
    'external-rearrange.js',
];

// project configuration
module.exports = {
    target: target,
    pkg: pkg,
    dir: dir,
    external_rearrange: external_rearrange,
    main: main,
    built_cleanee: built_cleanee,
    banner: banner,
    required_tasks: required_tasks,
};
