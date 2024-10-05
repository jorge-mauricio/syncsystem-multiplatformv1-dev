<?php
// Override the default configuration file.
declare(strict_types=1);

/**
 * This script configures phpMyAdmin to use cookie authentication mode.
 */

$i = 1; // Server 1
$cfg['Servers'][$i]['auth_type'] = 'cookie';
