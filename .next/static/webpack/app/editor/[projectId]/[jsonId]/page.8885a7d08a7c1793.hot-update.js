"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/editor/[projectId]/[jsonId]/page",{

/***/ "(app-pages-browser)/./src/features/editor/components/image-sidebar.tsx":
/*!**********************************************************!*\
  !*** ./src/features/editor/components/image-sidebar.tsx ***!
  \**********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ImageSidebar: function() { return /* binding */ ImageSidebar; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/next/dist/api/image.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* harmony import */ var _barrel_optimize_names_AlertTriangle_Loader_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! __barrel_optimize__?names=AlertTriangle,Loader!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/loader.js\");\n/* harmony import */ var _barrel_optimize_names_AlertTriangle_Loader_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! __barrel_optimize__?names=AlertTriangle,Loader!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/triangle-alert.js\");\n/* harmony import */ var _features_editor_components_tool_sidebar_close__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/features/editor/components/tool-sidebar-close */ \"(app-pages-browser)/./src/features/editor/components/tool-sidebar-close.tsx\");\n/* harmony import */ var _features_editor_components_tool_sidebar_header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/features/editor/components/tool-sidebar-header */ \"(app-pages-browser)/./src/features/editor/components/tool-sidebar-header.tsx\");\n/* harmony import */ var _features_images_api_use_get_images__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/features/images/api/use-get-images */ \"(app-pages-browser)/./src/features/images/api/use-get-images.ts\");\n/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/lib/utils */ \"(app-pages-browser)/./src/lib/utils.ts\");\n/* harmony import */ var _lib_uploadthing__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/lib/uploadthing */ \"(app-pages-browser)/./src/lib/uploadthing.ts\");\n/* harmony import */ var _components_ui_scroll_area__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/components/ui/scroll-area */ \"(app-pages-browser)/./src/components/ui/scroll-area.tsx\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\nconst ImageSidebar = (param)=>{\n    let { editor, activeTool, onChangeActiveTool } = param;\n    _s();\n    const { data, isLoading, isError } = (0,_features_images_api_use_get_images__WEBPACK_IMPORTED_MODULE_5__.useGetImages)();\n    const onClose = ()=>{\n        onChangeActiveTool(\"select\");\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"aside\", {\n        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)(\"bg-white relative border-r z-[40] w-[360px] h-full flex flex-col\", activeTool === \"images\" ? \"visible\" : \"hidden\"),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_features_editor_components_tool_sidebar_header__WEBPACK_IMPORTED_MODULE_4__.ToolSidebarHeader, {\n                title: \"Images\",\n                description: \"Add images to your canvas\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\ASUS\\\\Desktop\\\\RHBcanva\\\\image-ai-master\\\\src\\\\features\\\\editor\\\\components\\\\image-sidebar.tsx\",\n                lineNumber: 42,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"p-4 border-b\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_lib_uploadthing__WEBPACK_IMPORTED_MODULE_7__.UploadButton, {\n                    appearance: {\n                        button: \"w-full text-sm font-medium\",\n                        allowedContent: \"hidden\"\n                    },\n                    content: {\n                        button: \"Upload Image\"\n                    },\n                    endpoint: \"imageUploader\",\n                    onClientUploadComplete: (res)=>{\n                        clo;\n                        editor === null || editor === void 0 ? void 0 : editor.addImage(res[0].url);\n                    }\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\ASUS\\\\Desktop\\\\RHBcanva\\\\image-ai-master\\\\src\\\\features\\\\editor\\\\components\\\\image-sidebar.tsx\",\n                    lineNumber: 47,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\ASUS\\\\Desktop\\\\RHBcanva\\\\image-ai-master\\\\src\\\\features\\\\editor\\\\components\\\\image-sidebar.tsx\",\n                lineNumber: 46,\n                columnNumber: 7\n            }, undefined),\n            isLoading && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex items-center justify-center flex-1\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AlertTriangle_Loader_lucide_react__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                    className: \"size-4 text-muted-foreground animate-spin\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\ASUS\\\\Desktop\\\\RHBcanva\\\\image-ai-master\\\\src\\\\features\\\\editor\\\\components\\\\image-sidebar.tsx\",\n                    lineNumber: 64,\n                    columnNumber: 11\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\ASUS\\\\Desktop\\\\RHBcanva\\\\image-ai-master\\\\src\\\\features\\\\editor\\\\components\\\\image-sidebar.tsx\",\n                lineNumber: 63,\n                columnNumber: 9\n            }, undefined),\n            isError && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col gap-y-4 items-center justify-center flex-1\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AlertTriangle_Loader_lucide_react__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n                        className: \"size-4 text-muted-foreground\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\ASUS\\\\Desktop\\\\RHBcanva\\\\image-ai-master\\\\src\\\\features\\\\editor\\\\components\\\\image-sidebar.tsx\",\n                        lineNumber: 69,\n                        columnNumber: 11\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: \"text-muted-foreground text-xs\",\n                        children: \"Failed to fetch images\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\ASUS\\\\Desktop\\\\RHBcanva\\\\image-ai-master\\\\src\\\\features\\\\editor\\\\components\\\\image-sidebar.tsx\",\n                        lineNumber: 70,\n                        columnNumber: 11\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\ASUS\\\\Desktop\\\\RHBcanva\\\\image-ai-master\\\\src\\\\features\\\\editor\\\\components\\\\image-sidebar.tsx\",\n                lineNumber: 68,\n                columnNumber: 9\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_scroll_area__WEBPACK_IMPORTED_MODULE_8__.ScrollArea, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"p-4\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"grid grid-cols-2 gap-4\",\n                        children: data && data.map((image)=>{\n                            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                onClick: ()=>editor === null || editor === void 0 ? void 0 : editor.addImage(image.urls.regular),\n                                className: \"relative w-full h-[100px] group hover:opacity-75 transition bg-muted rounded-sm overflow-hidden border\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_image__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                                        fill: true,\n                                        src: image.urls.small,\n                                        alt: image.alt_description || \"Image\",\n                                        className: \"object-cover\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\ASUS\\\\Desktop\\\\RHBcanva\\\\image-ai-master\\\\src\\\\features\\\\editor\\\\components\\\\image-sidebar.tsx\",\n                                        lineNumber: 85,\n                                        columnNumber: 19\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                                        target: \"_blank\",\n                                        href: image.links.html,\n                                        className: \"opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50 text-left\",\n                                        children: image.user.name\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\ASUS\\\\Desktop\\\\RHBcanva\\\\image-ai-master\\\\src\\\\features\\\\editor\\\\components\\\\image-sidebar.tsx\",\n                                        lineNumber: 91,\n                                        columnNumber: 19\n                                    }, undefined)\n                                ]\n                            }, image.id, true, {\n                                fileName: \"C:\\\\Users\\\\ASUS\\\\Desktop\\\\RHBcanva\\\\image-ai-master\\\\src\\\\features\\\\editor\\\\components\\\\image-sidebar.tsx\",\n                                lineNumber: 80,\n                                columnNumber: 17\n                            }, undefined);\n                        })\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\ASUS\\\\Desktop\\\\RHBcanva\\\\image-ai-master\\\\src\\\\features\\\\editor\\\\components\\\\image-sidebar.tsx\",\n                        lineNumber: 77,\n                        columnNumber: 11\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\ASUS\\\\Desktop\\\\RHBcanva\\\\image-ai-master\\\\src\\\\features\\\\editor\\\\components\\\\image-sidebar.tsx\",\n                    lineNumber: 76,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\ASUS\\\\Desktop\\\\RHBcanva\\\\image-ai-master\\\\src\\\\features\\\\editor\\\\components\\\\image-sidebar.tsx\",\n                lineNumber: 75,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_features_editor_components_tool_sidebar_close__WEBPACK_IMPORTED_MODULE_3__.ToolSidebarClose, {\n                onClick: onClose\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\ASUS\\\\Desktop\\\\RHBcanva\\\\image-ai-master\\\\src\\\\features\\\\editor\\\\components\\\\image-sidebar.tsx\",\n                lineNumber: 104,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\ASUS\\\\Desktop\\\\RHBcanva\\\\image-ai-master\\\\src\\\\features\\\\editor\\\\components\\\\image-sidebar.tsx\",\n        lineNumber: 36,\n        columnNumber: 5\n    }, undefined);\n};\n_s(ImageSidebar, \"6mSIyH6ts/kvKQB8iJH4w3849UE=\", false, function() {\n    return [\n        _features_images_api_use_get_images__WEBPACK_IMPORTED_MODULE_5__.useGetImages\n    ];\n});\n_c = ImageSidebar;\nvar _c;\n$RefreshReg$(_c, \"ImageSidebar\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9mZWF0dXJlcy9lZGl0b3IvY29tcG9uZW50cy9pbWFnZS1zaWRlYmFyLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUErQjtBQUNGO0FBQ2dDO0FBTXNCO0FBQ0U7QUFFakI7QUFFbkM7QUFDZ0I7QUFDUTtBQVFsRCxNQUFNVSxlQUFlO1FBQUMsRUFDM0JDLE1BQU0sRUFDTkMsVUFBVSxFQUNWQyxrQkFBa0IsRUFDQTs7SUFDbEIsTUFBTSxFQUFFQyxJQUFJLEVBQUVDLFNBQVMsRUFBRUMsT0FBTyxFQUFFLEdBQUdWLGlGQUFZQTtJQUVqRCxNQUFNVyxVQUFVO1FBQ2RKLG1CQUFtQjtJQUNyQjtJQUVBLHFCQUNFLDhEQUFDSztRQUNDQyxXQUFXWiw4Q0FBRUEsQ0FDWCxvRUFDQUssZUFBZSxXQUFXLFlBQVk7OzBCQUd4Qyw4REFBQ1AsOEZBQWlCQTtnQkFDaEJlLE9BQU07Z0JBQ05DLGFBQVk7Ozs7OzswQkFFZCw4REFBQ0M7Z0JBQUlILFdBQVU7MEJBQ2IsNEVBQUNYLDBEQUFZQTtvQkFDWGUsWUFBWTt3QkFDVkMsUUFBUTt3QkFDUkMsZ0JBQWdCO29CQUNsQjtvQkFDQUMsU0FBUzt3QkFDUEYsUUFBUTtvQkFDVjtvQkFDQUcsVUFBUztvQkFDVEMsd0JBQXdCLENBQUNDO3dCQUN2QkM7d0JBQ0FuQixtQkFBQUEsNkJBQUFBLE9BQVFvQixRQUFRLENBQUNGLEdBQUcsQ0FBQyxFQUFFLENBQUNHLEdBQUc7b0JBQzdCOzs7Ozs7Ozs7OztZQUdIakIsMkJBQ0MsOERBQUNPO2dCQUFJSCxXQUFVOzBCQUNiLDRFQUFDaEIsZ0dBQU1BO29CQUFDZ0IsV0FBVTs7Ozs7Ozs7Ozs7WUFHckJILHlCQUNDLDhEQUFDTTtnQkFBSUgsV0FBVTs7a0NBQ2IsOERBQUNqQixpR0FBYUE7d0JBQUNpQixXQUFVOzs7Ozs7a0NBQ3pCLDhEQUFDYzt3QkFBRWQsV0FBVTtrQ0FBZ0M7Ozs7Ozs7Ozs7OzswQkFLakQsOERBQUNWLGtFQUFVQTswQkFDVCw0RUFBQ2E7b0JBQUlILFdBQVU7OEJBQ2IsNEVBQUNHO3dCQUFJSCxXQUFVO2tDQUNaTCxRQUFRQSxLQUFLb0IsR0FBRyxDQUFDLENBQUNDOzRCQUNqQixxQkFDRSw4REFBQ1g7Z0NBQ0NZLFNBQVMsSUFBTXpCLG1CQUFBQSw2QkFBQUEsT0FBUW9CLFFBQVEsQ0FBQ0ksTUFBTUUsSUFBSSxDQUFDQyxPQUFPO2dDQUVsRG5CLFdBQVU7O2tEQUVWLDhEQUFDbkIsa0RBQUtBO3dDQUNKdUMsSUFBSTt3Q0FDSkMsS0FBS0wsTUFBTUUsSUFBSSxDQUFDSSxLQUFLO3dDQUNyQkMsS0FBS1AsTUFBTVEsZUFBZSxJQUFJO3dDQUM5QnhCLFdBQVU7Ozs7OztrREFFWiw4REFBQ2xCLGlEQUFJQTt3Q0FDSDJDLFFBQU87d0NBQ1BDLE1BQU1WLE1BQU1XLEtBQUssQ0FBQ0MsSUFBSTt3Q0FDdEI1QixXQUFVO2tEQUVUZ0IsTUFBTWEsSUFBSSxDQUFDQyxJQUFJOzs7Ozs7OytCQWRiZCxNQUFNZSxFQUFFOzs7Ozt3QkFrQm5COzs7Ozs7Ozs7Ozs7Ozs7OzBCQUlOLDhEQUFDOUMsNEZBQWdCQTtnQkFBQ2dDLFNBQVNuQjs7Ozs7Ozs7Ozs7O0FBR2pDLEVBQUU7R0FuRldQOztRQUswQkosNkVBQVlBOzs7S0FMdENJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9mZWF0dXJlcy9lZGl0b3IvY29tcG9uZW50cy9pbWFnZS1zaWRlYmFyLnRzeD83NjRiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbWFnZSBmcm9tIFwibmV4dC9pbWFnZVwiO1xuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiO1xuaW1wb3J0IHsgQWxlcnRUcmlhbmdsZSwgTG9hZGVyLCBVcGxvYWQgfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5cbmltcG9ydCB7IFxuICBBY3RpdmVUb29sLCBcbiAgRWRpdG9yLFxufSBmcm9tIFwiQC9mZWF0dXJlcy9lZGl0b3IvdHlwZXNcIjtcbmltcG9ydCB7IFRvb2xTaWRlYmFyQ2xvc2UgfSBmcm9tIFwiQC9mZWF0dXJlcy9lZGl0b3IvY29tcG9uZW50cy90b29sLXNpZGViYXItY2xvc2VcIjtcbmltcG9ydCB7IFRvb2xTaWRlYmFySGVhZGVyIH0gZnJvbSBcIkAvZmVhdHVyZXMvZWRpdG9yL2NvbXBvbmVudHMvdG9vbC1zaWRlYmFyLWhlYWRlclwiO1xuXG5pbXBvcnQgeyB1c2VHZXRJbWFnZXMgfSBmcm9tIFwiQC9mZWF0dXJlcy9pbWFnZXMvYXBpL3VzZS1nZXQtaW1hZ2VzXCI7XG5cbmltcG9ydCB7IGNuIH0gZnJvbSBcIkAvbGliL3V0aWxzXCI7XG5pbXBvcnQgeyBVcGxvYWRCdXR0b24gfSBmcm9tIFwiQC9saWIvdXBsb2FkdGhpbmdcIjtcbmltcG9ydCB7IFNjcm9sbEFyZWEgfSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL3Njcm9sbC1hcmVhXCI7XG5cbmludGVyZmFjZSBJbWFnZVNpZGViYXJQcm9wcyB7XG4gIGVkaXRvcjogRWRpdG9yIHwgdW5kZWZpbmVkO1xuICBhY3RpdmVUb29sOiBBY3RpdmVUb29sO1xuICBvbkNoYW5nZUFjdGl2ZVRvb2w6ICh0b29sOiBBY3RpdmVUb29sKSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IGNvbnN0IEltYWdlU2lkZWJhciA9ICh7XG4gIGVkaXRvcixcbiAgYWN0aXZlVG9vbCxcbiAgb25DaGFuZ2VBY3RpdmVUb29sLFxufTogSW1hZ2VTaWRlYmFyUHJvcHMpID0+IHtcbiAgY29uc3QgeyBkYXRhLCBpc0xvYWRpbmcsIGlzRXJyb3IgfSA9IHVzZUdldEltYWdlcygpO1xuXG4gIGNvbnN0IG9uQ2xvc2UgPSAoKSA9PiB7XG4gICAgb25DaGFuZ2VBY3RpdmVUb29sKFwic2VsZWN0XCIpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGFzaWRlXG4gICAgICBjbGFzc05hbWU9e2NuKFxuICAgICAgICBcImJnLXdoaXRlIHJlbGF0aXZlIGJvcmRlci1yIHotWzQwXSB3LVszNjBweF0gaC1mdWxsIGZsZXggZmxleC1jb2xcIixcbiAgICAgICAgYWN0aXZlVG9vbCA9PT0gXCJpbWFnZXNcIiA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIixcbiAgICAgICl9XG4gICAgPlxuICAgICAgPFRvb2xTaWRlYmFySGVhZGVyXG4gICAgICAgIHRpdGxlPVwiSW1hZ2VzXCJcbiAgICAgICAgZGVzY3JpcHRpb249XCJBZGQgaW1hZ2VzIHRvIHlvdXIgY2FudmFzXCJcbiAgICAgIC8+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBib3JkZXItYlwiPlxuICAgICAgICA8VXBsb2FkQnV0dG9uXG4gICAgICAgICAgYXBwZWFyYW5jZT17e1xuICAgICAgICAgICAgYnV0dG9uOiBcInctZnVsbCB0ZXh0LXNtIGZvbnQtbWVkaXVtXCIsXG4gICAgICAgICAgICBhbGxvd2VkQ29udGVudDogXCJoaWRkZW5cIlxuICAgICAgICAgIH19XG4gICAgICAgICAgY29udGVudD17e1xuICAgICAgICAgICAgYnV0dG9uOiBcIlVwbG9hZCBJbWFnZVwiXG4gICAgICAgICAgfX1cbiAgICAgICAgICBlbmRwb2ludD1cImltYWdlVXBsb2FkZXJcIlxuICAgICAgICAgIG9uQ2xpZW50VXBsb2FkQ29tcGxldGU9eyhyZXMpID0+IHtcbiAgICAgICAgICAgIGNsb1xuICAgICAgICAgICAgZWRpdG9yPy5hZGRJbWFnZShyZXNbMF0udXJsKTtcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgICB7aXNMb2FkaW5nICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBmbGV4LTFcIj5cbiAgICAgICAgICA8TG9hZGVyIGNsYXNzTmFtZT1cInNpemUtNCB0ZXh0LW11dGVkLWZvcmVncm91bmQgYW5pbWF0ZS1zcGluXCIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgICAge2lzRXJyb3IgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLXktNCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZmxleC0xXCI+XG4gICAgICAgICAgPEFsZXJ0VHJpYW5nbGUgY2xhc3NOYW1lPVwic2l6ZS00IHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiIC8+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1tdXRlZC1mb3JlZ3JvdW5kIHRleHQteHNcIj5cbiAgICAgICAgICAgIEZhaWxlZCB0byBmZXRjaCBpbWFnZXNcbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICAgIDxTY3JvbGxBcmVhPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtNFwiPlxuICAgICAgICAgICAge2RhdGEgJiYgZGF0YS5tYXAoKGltYWdlKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZWRpdG9yPy5hZGRJbWFnZShpbWFnZS51cmxzLnJlZ3VsYXIpfVxuICAgICAgICAgICAgICAgICAga2V5PXtpbWFnZS5pZH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIHctZnVsbCBoLVsxMDBweF0gZ3JvdXAgaG92ZXI6b3BhY2l0eS03NSB0cmFuc2l0aW9uIGJnLW11dGVkIHJvdW5kZWQtc20gb3ZlcmZsb3ctaGlkZGVuIGJvcmRlclwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPEltYWdlXG4gICAgICAgICAgICAgICAgICAgIGZpbGxcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtpbWFnZS51cmxzLnNtYWxsfVxuICAgICAgICAgICAgICAgICAgICBhbHQ9e2ltYWdlLmFsdF9kZXNjcmlwdGlvbiB8fCBcIkltYWdlXCJ9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm9iamVjdC1jb3ZlclwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPExpbmtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgICAgICAgICAgaHJlZj17aW1hZ2UubGlua3MuaHRtbH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwib3BhY2l0eS0wIGdyb3VwLWhvdmVyOm9wYWNpdHktMTAwIGFic29sdXRlIGxlZnQtMCBib3R0b20tMCB3LWZ1bGwgdGV4dC1bMTBweF0gdHJ1bmNhdGUgdGV4dC13aGl0ZSBob3Zlcjp1bmRlcmxpbmUgcC0xIGJnLWJsYWNrLzUwIHRleHQtbGVmdFwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtpbWFnZS51c2VyLm5hbWV9XG4gICAgICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvU2Nyb2xsQXJlYT5cbiAgICAgIDxUb29sU2lkZWJhckNsb3NlIG9uQ2xpY2s9e29uQ2xvc2V9IC8+XG4gICAgPC9hc2lkZT5cbiAgKTtcbn07XG4iXSwibmFtZXMiOlsiSW1hZ2UiLCJMaW5rIiwiQWxlcnRUcmlhbmdsZSIsIkxvYWRlciIsIlRvb2xTaWRlYmFyQ2xvc2UiLCJUb29sU2lkZWJhckhlYWRlciIsInVzZUdldEltYWdlcyIsImNuIiwiVXBsb2FkQnV0dG9uIiwiU2Nyb2xsQXJlYSIsIkltYWdlU2lkZWJhciIsImVkaXRvciIsImFjdGl2ZVRvb2wiLCJvbkNoYW5nZUFjdGl2ZVRvb2wiLCJkYXRhIiwiaXNMb2FkaW5nIiwiaXNFcnJvciIsIm9uQ2xvc2UiLCJhc2lkZSIsImNsYXNzTmFtZSIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJkaXYiLCJhcHBlYXJhbmNlIiwiYnV0dG9uIiwiYWxsb3dlZENvbnRlbnQiLCJjb250ZW50IiwiZW5kcG9pbnQiLCJvbkNsaWVudFVwbG9hZENvbXBsZXRlIiwicmVzIiwiY2xvIiwiYWRkSW1hZ2UiLCJ1cmwiLCJwIiwibWFwIiwiaW1hZ2UiLCJvbkNsaWNrIiwidXJscyIsInJlZ3VsYXIiLCJmaWxsIiwic3JjIiwic21hbGwiLCJhbHQiLCJhbHRfZGVzY3JpcHRpb24iLCJ0YXJnZXQiLCJocmVmIiwibGlua3MiLCJodG1sIiwidXNlciIsIm5hbWUiLCJpZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/features/editor/components/image-sidebar.tsx\n"));

/***/ })

});