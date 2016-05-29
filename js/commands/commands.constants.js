(function () {
    'use strict';
 
    angular
        .module('CommandModule')
        .constant('COMMANDS_ENDPOINT', 'http://localhost:3000/commands');
 
})();