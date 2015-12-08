import { StateClassNameDirective } from './directives/stateClassName.directive';

angular.module('utils', [])
  .directive('stateClassName', StateClassNameDirective);
