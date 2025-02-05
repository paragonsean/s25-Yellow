const express = require('express');
const router = express.Router();
const db = require('../db');
const {hashPassword} = require('../utils/authHelper'); 
require('dotenv').config();

