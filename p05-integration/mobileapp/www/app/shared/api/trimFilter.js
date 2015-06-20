// Source: 
/**
 * Filter to delete whitesapces at the beginning and end of an string.
 *
 * @class app.api.trimFilter
 * @memberOf app.api
 * @author Sumit Chawla
 * @see {@link https://github.com/sumitchawla/angularjs-filters}
 */
angular.module('mvg.api').filter('trim', function () {
    return function (str) {
        return (str || '')
            .replace(/&nbsp;/g, function (match, group) {
                return '';
            }).replace(/^\s*/g, function (match, group) {
                return '';
            }).replace(/\s*$/g, function (match, group) {
                return '';
            });
    }
});
