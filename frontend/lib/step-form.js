import React, { useContext, useEffect, useState } from 'react';
var StepsContext = React.createContext({
  // Dummy values for satisfying the type checker
  // Gets updated before being passed down
  size: 0,
  current: 1,
  progress: 0,
  allSteps: [],
  state: {},
  handleChange: function handleChange(event) {},
  setState: function setState(key, value) {},
  getState: function getState(key, defaultValue) {
    return '';
  },
  next: function next() {},
  prev: function prev() {},
  jump: function jump(id) {},
});
var StepContext = React.createContext({
  order: 0,
});
/**
 * Wrapper component for `Step` components.
 */

export function Steps(_ref) {
  var children = _ref.children,
    config = _ref.config;

  var _a, _b;

  var childSteps = React.Children.toArray(children);

  var NavigationComponent = function NavigationComponent(context) {
    var _a, _b;

    if (
      (_a =
        config === null || config === void 0 ? void 0 : config.navigation) ===
        null || _a === void 0
        ? void 0
        : _a.component
    ) {
      var NavComponent =
        (_b =
          config === null || config === void 0 ? void 0 : config.navigation) ===
          null || _b === void 0
          ? void 0
          : _b.component;
      return React.createElement(NavComponent, Object.assign({}, context));
    }
  };

  var allSteps = childSteps.map(function (child, order) {
    return {
      title: child.props.title || 'Step ' + (order + 1),
      order: order + 1,
    };
  });
  var size = childSteps.length;

  var _current = useState(1);

  var current = _current[0];
  var setCurrent = _current[1];

  var _stepState = useState({});

  var stepState = _stepState[0];
  var setStepState = _stepState[1];

  var _progress = useState(0);

  var progress = _progress[0];
  var setProgress = _progress[1];
  useEffect(
    function () {
      if (current === 1) setProgress(0);
      else if (current === size) setProgress(1);
      else setProgress((current - 1) / (size - 1));
    },
    [current, setProgress, size],
  );

  var next = function next() {
    if (current < size) {
      setCurrent(current + 1);
    }
  };

  var prev = function prev() {
    if (current > 1) {
      setCurrent(current - 1);
    }
  };

  var jump = function jump(step) {
    if (step >= 1 && step <= size) {
      setCurrent(step);
    }
  };

  var getState = function getState(key, defaultValue) {
    if (key in stepState) {
      return stepState[key];
    }

    return defaultValue;
  };

  var setState = function setState(key, value) {
    var newState = Object.assign({}, stepState);
    newState[key] = value;
    setStepState(newState);
  };

  var handleChange = function handleChange(event) {
    var key = event.currentTarget.name;
    var inputType = event.currentTarget.type;
    var value =
      inputType === 'checkbox'
        ? event.currentTarget.checked
        : event.currentTarget.value;
    var newState = Object.assign({}, stepState);
    newState[key] = value;
    setStepState(newState);
  };

  var context = {
    size: size,
    current: current,
    progress: progress,
    allSteps: allSteps,
    state: stepState,
    handleChange: handleChange,
    setState: setState,
    getState: getState,
    next: next,
    prev: prev,
    jump: jump,
  };
  return React.createElement(
    StepsContext.Provider,
    {
      value: context,
    },
    ((_a =
      config === null || config === void 0 ? void 0 : config.navigation) ===
      null || _a === void 0
      ? void 0
      : _a.location) === 'before' && NavigationComponent(context),
    React.Children.map(children, function (child, order) {
      return React.createElement(
        StepContext.Provider,
        {
          value: {
            order: order + 1,
          },
        },
        child,
      );
    }),
    ((_b =
      config === null || config === void 0 ? void 0 : config.navigation) ===
      null || _b === void 0
      ? void 0
      : _b.location) === 'after' && NavigationComponent(context),
  );
}
/**
 * Wrapper component for each individual step.
 */

export function Step(props) {
  var _useContext = useContext(StepContext),
    order = _useContext.order;

  var title = props.title,
    Component = props.component,
    beforeStepChange = props.beforeStepChange;
  var stepsContextValue = useContext(StepsContext);
  var size = stepsContextValue.size,
    current = stepsContextValue.current;

  var isFirst = function isFirst() {
    return order === 1;
  };

  var isLast = function isLast() {
    return order === size;
  };

  var hasNext = function hasNext() {
    return order < size;
  };

  var hasPrev = function hasPrev() {
    return order > 1;
  };

  useEffect(
    function () {
      return function () {
        if (current === order && beforeStepChange) beforeStepChange();
      };
    },
    [current, order, beforeStepChange],
  );

  if (order === current) {
    var newProps = Object.assign({}, props);
    delete newProps.component;
    var defaultTitle = 'Step ' + order;
    return React.createElement(
      Component,
      Object.assign({}, newProps, stepsContextValue, {
        title: title || defaultTitle,
        order: order,
        hasPrev: hasPrev,
        hasNext: hasNext,
        isFirst: isFirst,
        isLast: isLast,
      }),
    );
  }

  return null;
}
