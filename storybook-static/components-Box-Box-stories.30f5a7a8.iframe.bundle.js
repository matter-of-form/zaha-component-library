"use strict";
(self.webpackChunkcomponent_library =
  self.webpackChunkcomponent_library || []).push([
  [186],
  {
    "./components/Box/Box.stories.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          AnimatedBox: () => AnimatedBox,
          PlainBox: () => PlainBox,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        });
      const __WEBPACK_DEFAULT_EXPORT__ = {
        component: __webpack_require__("./components/Box/index.tsx").x,
        argTypes: { intent: { table: { disable: !0 } } },
      };
      var PlainBox = {
          args: { className: "rounded-3xl w-40 h-40 bg-blue-500" },
        },
        AnimatedBox = {
          args: {
            className: "rounded-3xl w-40 h-40 bg-blue-500",
            initial: "inactive",
            animate: "active",
            variants: {
              inactive: { x: 0 },
              active: {
                x: 400,
                transition: {
                  repeat: 1 / 0,
                  repeatType: "mirror",
                  type: "spring",
                  damping: 20,
                  stiffness: 400,
                },
              },
            },
          },
        };
      (PlainBox.parameters = {
        ...PlainBox.parameters,
        docs: {
          ...PlainBox.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    className: 'rounded-3xl w-40 h-40 bg-blue-500'\n  }\n}",
            ...PlainBox.parameters?.docs?.source,
          },
        },
      }),
        (AnimatedBox.parameters = {
          ...AnimatedBox.parameters,
          docs: {
            ...AnimatedBox.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    className: 'rounded-3xl w-40 h-40 bg-blue-500',\n    // animation props\n    initial: 'inactive',\n    animate: 'active',\n    variants: {\n      inactive: {\n        x: 0\n      },\n      active: {\n        x: 400,\n        transition: {\n          repeat: Infinity,\n          repeatType: 'mirror',\n          type: 'spring',\n          damping: 20,\n          stiffness: 400\n        }\n      }\n    }\n  }\n}",
              ...AnimatedBox.parameters?.docs?.source,
            },
          },
        });
      const __namedExportsOrder = ["PlainBox", "AnimatedBox"];
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
  },
]);
