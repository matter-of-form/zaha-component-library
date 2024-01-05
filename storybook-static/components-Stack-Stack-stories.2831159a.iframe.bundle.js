"use strict";
(self.webpackChunkcomponent_library =
  self.webpackChunkcomponent_library || []).push([
  [576],
  {
    "./node_modules/@babel/runtime/helpers/esm/extends.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      function _extends() {
        return (
          (_extends = Object.assign
            ? Object.assign.bind()
            : function (target) {
                for (var i = 1; i < arguments.length; i++) {
                  var source = arguments[i];
                  for (var key in source)
                    Object.prototype.hasOwnProperty.call(source, key) &&
                      (target[key] = source[key]);
                }
                return target;
              }),
          _extends.apply(this, arguments)
        );
      }
      __webpack_require__.d(__webpack_exports__, { Z: () => _extends });
    },
    "./components/Stack/Stack.stories.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          AnimatedHorizontalStack: () => AnimatedHorizontalStack,
          AnimatedHorizontalStack_SpringIn: () =>
            AnimatedHorizontalStack_SpringIn,
          AnimatedVerticalStack: () => AnimatedVerticalStack,
          HorizontalStack: () => HorizontalStack,
          VerticalStack: () => VerticalStack,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => Stack_stories,
        });
      var esm_extends = __webpack_require__(
          "./node_modules/@babel/runtime/helpers/esm/extends.js",
        ),
        defineProperty = __webpack_require__(
          "./node_modules/@babel/runtime/helpers/esm/defineProperty.js",
        ),
        react = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js",
        ),
        components = __webpack_require__("./components/index.ts"),
        animController = function animController() {
          return {
            initial: "inactive",
            animate:
              arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
                ? "active"
                : "inactive",
            variants: {
              inactive: { opacity: 0 },
              active: {
                opacity: 1,
                transition: {
                  delay:
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : 0,
                  staggerChildren:
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : 0.2,
                },
              },
            },
          };
        },
        easeIn = { type: "spring", damping: 25 },
        fadeInUp = {
          variants: {
            inactive: { y: 50, opacity: 0 },
            active: { y: 0, opacity: 1, transition: easeIn },
          },
        },
        fadeInLeft = {
          variants: {
            inactive: { x: 50, opacity: 0 },
            active: { x: 0, opacity: 1, transition: easeIn },
          },
        },
        springIn = {
          variants: {
            inactive: { scale: 0, opacity: 0 },
            active: {
              scale: 1,
              opacity: 1,
              transition: { type: "spring", stiffness: 500 },
            },
          },
        },
        __jsx = react.createElement;
      function ownKeys(e, r) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          r &&
            (o = o.filter(function (r) {
              return Object.getOwnPropertyDescriptor(e, r).enumerable;
            })),
            t.push.apply(t, o);
        }
        return t;
      }
      function _objectSpread(e) {
        for (var r = 1; r < arguments.length; r++) {
          var t = null != arguments[r] ? arguments[r] : {};
          r % 2
            ? ownKeys(Object(t), !0).forEach(function (r) {
                (0, defineProperty.Z)(e, r, t[r]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
              : ownKeys(Object(t)).forEach(function (r) {
                  Object.defineProperty(
                    e,
                    r,
                    Object.getOwnPropertyDescriptor(t, r),
                  );
                });
        }
        return e;
      }
      var mockCopy =
        "Example of a block of copy. Have added 'my-10' to this block to get more aesthetical spacing above and below, but generally you'd set the gap on the encasing stack for consistency.";
      const Stack_stories = {
        component: components.Kq,
        argTypes: { intent: { table: { disable: !0 } } },
      };
      var VerticalStack = {
          args: {
            className: "w-1/2",
            direction: "column",
            gap: 2,
            children: [
              __jsx(components.xv, {
                text: "Example heading",
                textStyle: "h1",
              }),
              __jsx(components.xv, {
                text: "Example of a subheading",
                textStyle: "h5",
              }),
              __jsx(components.xv, {
                text: mockCopy,
                textStyle: "copy",
                className: "my-10",
              }),
              __jsx(components.zx, { text: "Click here" }),
            ],
          },
        },
        HorizontalStack = {
          args: {
            direction: "row",
            gap: 2,
            children: [
              __jsx(components.xu, {
                className: "rounded-3xl h-40 bg-blue-500",
              }),
              __jsx(components.xu, {
                className: "rounded-3xl h-40 bg-pink-500",
              }),
              __jsx(components.xu, {
                className: "rounded-3xl h-40 bg-purple-500",
              }),
              __jsx(components.xu, {
                className: "rounded-3xl h-40 bg-teal-500",
              }),
            ],
          },
        },
        AnimatedVerticalStack = {
          args: _objectSpread(
            {
              className: "w-1/2",
              direction: "column",
              gap: 2,
              children: [
                __jsx(
                  components.xv,
                  (0, esm_extends.Z)(
                    { text: "Example heading", textStyle: "h1" },
                    fadeInUp,
                  ),
                ),
                __jsx(
                  components.xv,
                  (0, esm_extends.Z)(
                    { text: "Example of a subheading", textStyle: "h5" },
                    fadeInUp,
                  ),
                ),
                __jsx(
                  components.xv,
                  (0, esm_extends.Z)(
                    { text: mockCopy, textStyle: "copy", className: "my-10" },
                    fadeInUp,
                  ),
                ),
                __jsx(
                  components.zx,
                  (0, esm_extends.Z)({ text: "Click here" }, fadeInUp),
                ),
              ],
            },
            animController(!0),
          ),
        },
        AnimatedHorizontalStack = {
          args: _objectSpread(
            {
              direction: "row",
              gap: 2,
              children: [
                __jsx(
                  components.xu,
                  (0, esm_extends.Z)(
                    { className: "rounded-3xl h-40 bg-blue-500" },
                    fadeInLeft,
                  ),
                ),
                __jsx(
                  components.xu,
                  (0, esm_extends.Z)(
                    { className: "rounded-3xl h-40 bg-pink-500" },
                    fadeInLeft,
                  ),
                ),
                __jsx(
                  components.xu,
                  (0, esm_extends.Z)(
                    { className: "rounded-3xl h-40 bg-purple-500" },
                    fadeInLeft,
                  ),
                ),
                __jsx(
                  components.xu,
                  (0, esm_extends.Z)(
                    { className: "rounded-3xl h-40 bg-teal-500" },
                    fadeInLeft,
                  ),
                ),
              ],
              className: "overflow-visible",
            },
            animController(!0),
          ),
        },
        AnimatedHorizontalStack_SpringIn = {
          args: _objectSpread(
            {
              direction: "row",
              gap: 2,
              children: [
                __jsx(
                  components.xu,
                  (0, esm_extends.Z)(
                    { className: "rounded-3xl h-40 bg-blue-500" },
                    fadeInLeft,
                  ),
                ),
                __jsx(
                  components.xu,
                  (0, esm_extends.Z)(
                    { className: "rounded-3xl h-40 bg-pink-500" },
                    fadeInLeft,
                  ),
                ),
                __jsx(
                  components.xu,
                  (0, esm_extends.Z)(
                    { className: "rounded-3xl h-40 bg-purple-500" },
                    springIn,
                  ),
                ),
                __jsx(
                  components.xu,
                  (0, esm_extends.Z)(
                    { className: "rounded-3xl h-40 bg-teal-500" },
                    springIn,
                  ),
                ),
              ],
              className: "overflow-visible",
            },
            animController(!0),
          ),
        };
      (VerticalStack.parameters = {
        ...VerticalStack.parameters,
        docs: {
          ...VerticalStack.parameters?.docs,
          source: {
            originalSource:
              '{\n  args: {\n    className: \'w-1/2\',\n    direction: \'column\',\n    gap: 2,\n    children: [<Text text="Example heading" textStyle="h1" />, <Text text="Example of a subheading" textStyle="h5" />, <Text text={mockCopy} textStyle="copy" className="my-10" />, <Button text="Click here" />]\n  }\n}',
            ...VerticalStack.parameters?.docs?.source,
          },
        },
      }),
        (HorizontalStack.parameters = {
          ...HorizontalStack.parameters,
          docs: {
            ...HorizontalStack.parameters?.docs,
            source: {
              originalSource:
                '{\n  args: {\n    direction: \'row\',\n    gap: 2,\n    children: [<Box className="rounded-3xl h-40 bg-blue-500" />, <Box className="rounded-3xl h-40 bg-pink-500" />, <Box className="rounded-3xl h-40 bg-purple-500" />, <Box className="rounded-3xl h-40 bg-teal-500" />]\n  }\n}',
              ...HorizontalStack.parameters?.docs?.source,
            },
          },
        }),
        (AnimatedVerticalStack.parameters = {
          ...AnimatedVerticalStack.parameters,
          docs: {
            ...AnimatedVerticalStack.parameters?.docs,
            source: {
              originalSource:
                '{\n  args: {\n    className: \'w-1/2\',\n    direction: \'column\',\n    gap: 2,\n    children: [<Text text="Example heading" textStyle="h1" {...fadeInUp} />, <Text text="Example of a subheading" textStyle="h5" {...fadeInUp} />, <Text text={mockCopy} textStyle="copy" className="my-10" {...fadeInUp} />, <Button text="Click here" {...fadeInUp} />],\n    ...animController(true)\n  }\n}',
              ...AnimatedVerticalStack.parameters?.docs?.source,
            },
          },
        }),
        (AnimatedHorizontalStack.parameters = {
          ...AnimatedHorizontalStack.parameters,
          docs: {
            ...AnimatedHorizontalStack.parameters?.docs,
            source: {
              originalSource:
                '{\n  args: {\n    direction: \'row\',\n    gap: 2,\n    children: [<Box className="rounded-3xl h-40 bg-blue-500" {...fadeInLeft} />, <Box className="rounded-3xl h-40 bg-pink-500" {...fadeInLeft} />, <Box className="rounded-3xl h-40 bg-purple-500" {...fadeInLeft} />, <Box className="rounded-3xl h-40 bg-teal-500" {...fadeInLeft} />],\n    className: "overflow-visible",\n    ...animController(true)\n  }\n}',
              ...AnimatedHorizontalStack.parameters?.docs?.source,
            },
          },
        }),
        (AnimatedHorizontalStack_SpringIn.parameters = {
          ...AnimatedHorizontalStack_SpringIn.parameters,
          docs: {
            ...AnimatedHorizontalStack_SpringIn.parameters?.docs,
            source: {
              originalSource:
                '{\n  args: {\n    direction: \'row\',\n    gap: 2,\n    children: [<Box className="rounded-3xl h-40 bg-blue-500" {...fadeInLeft} />, <Box className="rounded-3xl h-40 bg-pink-500" {...fadeInLeft} />, <Box className="rounded-3xl h-40 bg-purple-500" {...springIn} />, <Box className="rounded-3xl h-40 bg-teal-500" {...springIn} />],\n    className: "overflow-visible",\n    ...animController(true)\n  }\n}',
              ...AnimatedHorizontalStack_SpringIn.parameters?.docs?.source,
            },
          },
        });
      const __namedExportsOrder = [
        "VerticalStack",
        "HorizontalStack",
        "AnimatedVerticalStack",
        "AnimatedHorizontalStack",
        "AnimatedHorizontalStack_SpringIn",
      ];
    },
    "./components/Box/index.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      __webpack_require__.d(__webpack_exports__, { x: () => Box });
      var defineProperty = __webpack_require__(
          "./node_modules/@babel/runtime/helpers/esm/defineProperty.js",
        ),
        objectWithoutProperties = __webpack_require__(
          "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js",
        ),
        react = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js",
        ),
        box = (0,
        __webpack_require__(
          "./node_modules/class-variance-authority/dist/index.mjs",
        ).j)("box", {
          variants: { intent: { flex: ["flex flex-1"], block: ["block"] } },
          defaultVariants: { intent: "flex" },
        });
      try {
        (box.displayName = "box"),
          (box.__docgenInfo = {
            description: "",
            displayName: "box",
            props: {
              intent: {
                defaultValue: null,
                description: "",
                name: "intent",
                required: !1,
                type: { name: '"flex" | "block" | null' },
              },
              class: {
                defaultValue: null,
                description: "",
                name: "class",
                required: !1,
                type: { name: "ClassValue" },
              },
              className: {
                defaultValue: null,
                description: "",
                name: "className",
                required: !1,
                type: { name: "ClassValue" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["components/Box/Box.styles.tsx#box"] = {
              docgenInfo: box.__docgenInfo,
              name: "box",
              path: "components/Box/Box.styles.tsx#box",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var motion = __webpack_require__(
          "./node_modules/framer-motion/dist/es/render/dom/motion.mjs",
        ),
        _excluded = ["className", "variant"];
      function ownKeys(e, r) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          r &&
            (o = o.filter(function (r) {
              return Object.getOwnPropertyDescriptor(e, r).enumerable;
            })),
            t.push.apply(t, o);
        }
        return t;
      }
      function _objectSpread(e) {
        for (var r = 1; r < arguments.length; r++) {
          var t = null != arguments[r] ? arguments[r] : {};
          r % 2
            ? ownKeys(Object(t), !0).forEach(function (r) {
                (0, defineProperty.Z)(e, r, t[r]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
              : ownKeys(Object(t)).forEach(function (r) {
                  Object.defineProperty(
                    e,
                    r,
                    Object.getOwnPropertyDescriptor(t, r),
                  );
                });
        }
        return e;
      }
      var Box = function Box(_ref) {
        var className = _ref.className,
          _ref$variant = _ref.variant,
          variant = void 0 === _ref$variant ? "flex" : _ref$variant,
          props = (0, objectWithoutProperties.Z)(_ref, _excluded),
          isAnimated = props.animate || props.variants,
          allProps = _objectSpread(
            _objectSpread(
              {},
              (function boxVars(intent, classes) {
                var baseStyles = "\n        ".concat(classes || "", "\n    ");
                return { className: box({ intent, className: baseStyles }) };
              })(variant, className),
            ),
            props,
          );
        return (0, react.createElement)(
          isAnimated ? (0, motion.E)("div") : "div",
          allProps,
          props.children,
        );
      };
      try {
        (Box.displayName = "Box"),
          (Box.__docgenInfo = {
            description: "",
            displayName: "Box",
            props: {
              variant: {
                defaultValue: { value: "flex" },
                description: "",
                name: "variant",
                required: !1,
                type: {
                  name: "enum",
                  value: [{ value: '"flex"' }, { value: '"block"' }],
                },
              },
              intent: {
                defaultValue: null,
                description: "",
                name: "intent",
                required: !1,
                type: { name: '"flex" | "block" | null' },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["components/Box/index.tsx#Box"] = {
              docgenInfo: Box.__docgenInfo,
              name: "Box",
              path: "components/Box/index.tsx#Box",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./components/Button/index.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      __webpack_require__.d(__webpack_exports__, { z: () => Button });
      var defineProperty = __webpack_require__(
          "./node_modules/@babel/runtime/helpers/esm/defineProperty.js",
        ),
        objectWithoutProperties = __webpack_require__(
          "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js",
        ),
        react = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js",
        ),
        Button_styles_button = (0,
        __webpack_require__(
          "./node_modules/class-variance-authority/dist/index.mjs",
        ).j)("button", {
          variants: {
            intent: {
              primary: [
                "bg-blue-500",
                "text-white",
                "border-transparent",
                "hover:bg-blue-600",
              ],
              secondary: [
                "bg-green-300",
                "text-gray-800",
                "border-green-800",
                "hover:bg-green-400",
              ],
            },
            size: {
              sm: ["text-sm", "py-1", "px-2"],
              md: ["text-base", "py-2", "px-4"],
              full: ["py-2", "w-full"],
            },
          },
          compoundVariants: [
            { intent: "primary", size: ["md", "full"], class: "uppercase" },
          ],
          defaultVariants: { intent: "primary", size: "md" },
        });
      try {
        (Button_styles_button.displayName = "button"),
          (Button_styles_button.__docgenInfo = {
            description: "",
            displayName: "button",
            props: {
              intent: {
                defaultValue: null,
                description: "",
                name: "intent",
                required: !1,
                type: { name: '"primary" | "secondary" | null' },
              },
              size: {
                defaultValue: null,
                description: "",
                name: "size",
                required: !1,
                type: { name: '"sm" | "md" | "full" | null' },
              },
              class: {
                defaultValue: null,
                description: "",
                name: "class",
                required: !1,
                type: { name: "ClassValue" },
              },
              className: {
                defaultValue: null,
                description: "",
                name: "className",
                required: !1,
                type: { name: "ClassValue" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "components/Button/Button.styles.tsx#button"
            ] = {
              docgenInfo: Button_styles_button.__docgenInfo,
              name: "button",
              path: "components/Button/Button.styles.tsx#button",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var motion = __webpack_require__(
          "./node_modules/framer-motion/dist/es/render/dom/motion.mjs",
        ),
        components = __webpack_require__("./components/index.ts"),
        _excluded = ["className", "variant", "size", "text"],
        __jsx = react.createElement;
      function ownKeys(e, r) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          r &&
            (o = o.filter(function (r) {
              return Object.getOwnPropertyDescriptor(e, r).enumerable;
            })),
            t.push.apply(t, o);
        }
        return t;
      }
      function _objectSpread(e) {
        for (var r = 1; r < arguments.length; r++) {
          var t = null != arguments[r] ? arguments[r] : {};
          r % 2
            ? ownKeys(Object(t), !0).forEach(function (r) {
                (0, defineProperty.Z)(e, r, t[r]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
              : ownKeys(Object(t)).forEach(function (r) {
                  Object.defineProperty(
                    e,
                    r,
                    Object.getOwnPropertyDescriptor(t, r),
                  );
                });
        }
        return e;
      }
      var Button = function Button(_ref) {
        var className = _ref.className,
          _ref$variant = _ref.variant,
          variant = void 0 === _ref$variant ? "primary" : _ref$variant,
          _ref$size = _ref.size,
          size = void 0 === _ref$size ? "md" : _ref$size,
          _ref$text = _ref.text,
          text = void 0 === _ref$text ? "Button" : _ref$text,
          props = (0, objectWithoutProperties.Z)(_ref, _excluded),
          isAnimated = props.animate || props.variants,
          allProps = _objectSpread(
            _objectSpread(
              {},
              (function buttonVars(intent, size, classes) {
                var baseStyles = "\n        rounded mr-auto\n         ".concat(
                  classes || "",
                  "\n    ",
                );
                return {
                  className: Button_styles_button({
                    intent,
                    size,
                    className: baseStyles,
                  }),
                };
              })(variant, size, className),
            ),
            props,
          );
        return (0, react.createElement)(
          isAnimated ? (0, motion.E)("button") : "button",
          allProps,
          __jsx(components.xv, { text }),
        );
      };
      try {
        (Button.displayName = "Button"),
          (Button.__docgenInfo = {
            description: "",
            displayName: "Button",
            props: {
              text: {
                defaultValue: { value: "Button" },
                description: "",
                name: "text",
                required: !1,
                type: { name: "string" },
              },
              variant: {
                defaultValue: { value: "primary" },
                description: "",
                name: "variant",
                required: !1,
                type: {
                  name: "enum",
                  value: [{ value: '"primary"' }, { value: '"secondary"' }],
                },
              },
              intent: {
                defaultValue: null,
                description: "",
                name: "intent",
                required: !1,
                type: { name: '"primary" | "secondary" | null' },
              },
              size: {
                defaultValue: { value: "md" },
                description: "",
                name: "size",
                required: !1,
                type: { name: '"sm" | "md" | "full" | null' },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["components/Button/index.tsx#Button"] = {
              docgenInfo: Button.__docgenInfo,
              name: "Button",
              path: "components/Button/index.tsx#Button",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./components/Text/index.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      __webpack_require__.d(__webpack_exports__, { x: () => Text });
      var defineProperty = __webpack_require__(
          "./node_modules/@babel/runtime/helpers/esm/defineProperty.js",
        ),
        objectWithoutProperties = __webpack_require__(
          "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js",
        ),
        react = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js",
        ),
        Text_styles_text = (0,
        __webpack_require__(
          "./node_modules/class-variance-authority/dist/index.mjs",
        ).j)("text", {
          variants: {
            intent: {
              primary: ["text-white-800"],
              secondary: ["text-gray-800"],
            },
            size: {
              h1: "font-bold leading-tight text-4xl uppercase",
              h2: "font-bold leading-tight text-3xl",
              h3: "font-bold leading-tight text-2xl",
              h4: "font-medium leading-tight text-xl",
              h5: "font-medium leading-tight text-lg",
              h6: "font-medium leading-tight text-md",
              button: "font-medium leading-tight text-sm",
              copy: "leading-normal text-sm lh-2",
            },
          },
          compoundVariants: [
            { intent: "primary", size: "copy", class: "text-white-600" },
          ],
          defaultVariants: { intent: "primary", size: "copy" },
        });
      try {
        (Text_styles_text.displayName = "text"),
          (Text_styles_text.__docgenInfo = {
            description: "",
            displayName: "text",
            props: {
              intent: {
                defaultValue: null,
                description: "",
                name: "intent",
                required: !1,
                type: { name: '"primary" | "secondary" | null' },
              },
              size: {
                defaultValue: null,
                description: "",
                name: "size",
                required: !1,
                type: {
                  name: '"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "button" | "copy" | null',
                },
              },
              class: {
                defaultValue: null,
                description: "",
                name: "class",
                required: !1,
                type: { name: "ClassValue" },
              },
              className: {
                defaultValue: null,
                description: "",
                name: "className",
                required: !1,
                type: { name: "ClassValue" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["components/Text/Text.styles.tsx#text"] = {
              docgenInfo: Text_styles_text.__docgenInfo,
              name: "text",
              path: "components/Text/Text.styles.tsx#text",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var motion = __webpack_require__(
          "./node_modules/framer-motion/dist/es/render/dom/motion.mjs",
        ),
        _excluded = ["className", "variant", "text", "textStyle"];
      function ownKeys(e, r) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          r &&
            (o = o.filter(function (r) {
              return Object.getOwnPropertyDescriptor(e, r).enumerable;
            })),
            t.push.apply(t, o);
        }
        return t;
      }
      function _objectSpread(e) {
        for (var r = 1; r < arguments.length; r++) {
          var t = null != arguments[r] ? arguments[r] : {};
          r % 2
            ? ownKeys(Object(t), !0).forEach(function (r) {
                (0, defineProperty.Z)(e, r, t[r]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
              : ownKeys(Object(t)).forEach(function (r) {
                  Object.defineProperty(
                    e,
                    r,
                    Object.getOwnPropertyDescriptor(t, r),
                  );
                });
        }
        return e;
      }
      var Text = function Text(_ref) {
        var className = _ref.className,
          _ref$variant = _ref.variant,
          variant = void 0 === _ref$variant ? "primary" : _ref$variant,
          _ref$text = _ref.text,
          text = void 0 === _ref$text ? "Text" : _ref$text,
          _ref$textStyle = _ref.textStyle,
          textStyle = void 0 === _ref$textStyle ? "copy" : _ref$textStyle,
          props = (0, objectWithoutProperties.Z)(_ref, _excluded),
          isAnimated = props.animate || props.variants,
          allProps = _objectSpread(
            _objectSpread(
              _objectSpread(
                {},
                (function textVars(intent, size, classes) {
                  var baseStyles = "\n        ".concat(classes || "", "\n    ");
                  return {
                    className: Text_styles_text({
                      intent,
                      size,
                      className: baseStyles,
                    }),
                  };
                })(variant, textStyle, className),
              ),
              props,
            ),
            {},
            { dangerouslySetInnerHTML: { __html: text } },
          ),
          textTag = "copy" === textStyle ? "p" : textStyle;
        return (0, react.createElement)(
          isAnimated ? (0, motion.E)(textTag) : textTag,
          allProps,
        );
      };
      try {
        (Text.displayName = "Text"),
          (Text.__docgenInfo = {
            description: "",
            displayName: "Text",
            props: {
              text: {
                defaultValue: { value: "Text" },
                description: "",
                name: "text",
                required: !1,
                type: { name: "string" },
              },
              variant: {
                defaultValue: { value: "primary" },
                description: "",
                name: "variant",
                required: !1,
                type: {
                  name: "enum",
                  value: [{ value: '"primary"' }, { value: '"secondary"' }],
                },
              },
              textStyle: {
                defaultValue: { value: "copy" },
                description: "",
                name: "textStyle",
                required: !1,
                type: {
                  name: "enum",
                  value: [
                    { value: '"h1"' },
                    { value: '"h2"' },
                    { value: '"h3"' },
                    { value: '"h4"' },
                    { value: '"h5"' },
                    { value: '"h6"' },
                    { value: '"button"' },
                    { value: '"copy"' },
                  ],
                },
              },
              intent: {
                defaultValue: null,
                description: "",
                name: "intent",
                required: !1,
                type: { name: '"primary" | "secondary" | null' },
              },
              size: {
                defaultValue: null,
                description: "",
                name: "size",
                required: !1,
                type: {
                  name: '"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "button" | "copy" | null',
                },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["components/Text/index.tsx#Text"] = {
              docgenInfo: Text.__docgenInfo,
              name: "Text",
              path: "components/Text/index.tsx#Text",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./components/index.ts": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        xu: () => Box.x,
        zx: () => Button.z,
        Kq: () => Stack,
        xv: () => Text.x,
      });
      var Box = __webpack_require__("./components/Box/index.tsx"),
        Button = __webpack_require__("./components/Button/index.tsx"),
        defineProperty = __webpack_require__(
          "./node_modules/@babel/runtime/helpers/esm/defineProperty.js",
        ),
        objectWithoutProperties = __webpack_require__(
          "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js",
        ),
        react = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js",
        ),
        stack = (0,
        __webpack_require__(
          "./node_modules/class-variance-authority/dist/index.mjs",
        ).j)("stack", {
          variants: {
            intent: { row: ["flex", "flex-row"], column: ["flex", "flex-col"] },
          },
          defaultVariants: { intent: "column" },
        });
      try {
        (stack.displayName = "stack"),
          (stack.__docgenInfo = {
            description: "",
            displayName: "stack",
            props: {
              intent: {
                defaultValue: null,
                description: "",
                name: "intent",
                required: !1,
                type: { name: '"row" | "column" | null' },
              },
              class: {
                defaultValue: null,
                description: "",
                name: "class",
                required: !1,
                type: { name: "ClassValue" },
              },
              className: {
                defaultValue: null,
                description: "",
                name: "className",
                required: !1,
                type: { name: "ClassValue" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "components/Stack/Stack.styles.tsx#stack"
            ] = {
              docgenInfo: stack.__docgenInfo,
              name: "stack",
              path: "components/Stack/Stack.styles.tsx#stack",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var motion = __webpack_require__(
          "./node_modules/framer-motion/dist/es/render/dom/motion.mjs",
        ),
        _excluded = ["className", "direction", "gap"];
      function ownKeys(e, r) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          r &&
            (o = o.filter(function (r) {
              return Object.getOwnPropertyDescriptor(e, r).enumerable;
            })),
            t.push.apply(t, o);
        }
        return t;
      }
      function _objectSpread(e) {
        for (var r = 1; r < arguments.length; r++) {
          var t = null != arguments[r] ? arguments[r] : {};
          r % 2
            ? ownKeys(Object(t), !0).forEach(function (r) {
                (0, defineProperty.Z)(e, r, t[r]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
              : ownKeys(Object(t)).forEach(function (r) {
                  Object.defineProperty(
                    e,
                    r,
                    Object.getOwnPropertyDescriptor(t, r),
                  );
                });
        }
        return e;
      }
      var Stack = function Stack(_ref) {
        var className = _ref.className,
          _ref$direction = _ref.direction,
          direction = void 0 === _ref$direction ? "row" : _ref$direction,
          _ref$gap = _ref.gap,
          gap = void 0 === _ref$gap ? 2 : _ref$gap,
          props = (0, objectWithoutProperties.Z)(_ref, _excluded),
          isAnimated = props.animate || props.variants,
          allProps = _objectSpread(
            _objectSpread(
              {},
              (function stackVars(intent, gap, classes) {
                var baseStyles = "\n        gap-"
                  .concat(gap, "\n        ")
                  .concat(classes || "", "\n    ");
                return { className: stack({ intent, className: baseStyles }) };
              })(direction, gap, className),
            ),
            props,
          );
        return (0, react.createElement)(
          isAnimated ? (0, motion.E)("div") : "div",
          allProps,
          props.children,
        );
      };
      try {
        (Stack.displayName = "Stack"),
          (Stack.__docgenInfo = {
            description: "",
            displayName: "Stack",
            props: {
              gap: {
                defaultValue: { value: "2" },
                description: "",
                name: "gap",
                required: !1,
                type: { name: "number" },
              },
              direction: {
                defaultValue: { value: "row" },
                description: "",
                name: "direction",
                required: !1,
                type: {
                  name: "enum",
                  value: [{ value: '"row"' }, { value: '"column"' }],
                },
              },
              props: {
                defaultValue: null,
                description: "",
                name: "props",
                required: !1,
                type: { name: "any" },
              },
              intent: {
                defaultValue: null,
                description: "",
                name: "intent",
                required: !1,
                type: { name: '"row" | "column" | null' },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["components/Stack/index.tsx#Stack"] = {
              docgenInfo: Stack.__docgenInfo,
              name: "Stack",
              path: "components/Stack/index.tsx#Stack",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var Text = __webpack_require__("./components/Text/index.tsx");
    },
  },
]);
