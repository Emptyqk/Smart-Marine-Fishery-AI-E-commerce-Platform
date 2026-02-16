# xiaotuxian

## Project Overview
Xiaotuxian is a front-end and e-commerce web application built with Vue3 and Vite, focusing on common bussiness scenarios in online shopping platforms.

The project simulates real-world e-commerce functionality and emphasizes clean component design, state management, and route.

Currently, the core implementation includes address management, covering full Create, Read, Update, and Delete workflows.

## New function
### AI Floating Chat Assistant

The AI assistant supports streaming responses (SSE-based rendering) to simulate real-time conversational interaction.

#### Streaming Data Handling
The chat module reads response streams incrementally and appends content to the assistant message in real time, enhancing user interaction experience.

#### Optimistic UI Rendering
A placeholder assistant message is inserted before the response arrives, and content is progressively updated during streaming.

#### Decoupled Architecture
Chat state management and API logic are separated through composables and centralized configuration.

#### Extensible Model Configuration
Model parameters such as temperature, token limits, and streaming mode are configurable via state management.

This implementation simulates real-world AI customer service integration in modern e-commerce systems.

### SubCategory Product Virtual List Optimization

To improve rendering performance under large datasets, the subCategory product list has been optimized using virtual scrolling techniques.

### Virtual Rendering
Only visible items within the viewport are rendered to the DOM, significantly reducing memory consumption and improving rendering performance.

### Performance Optimization for Large Data Sets
The implementation ensures smooth scrolling behavior even when handling large numbers of products.

### Address
The address module supports complete lifecycle operations:

#### Create:
Users can add a new shipping address via a form with validation.

#### Read:
Existing addresses are fetched and displayed in a structured list.

#### Update:
Users can edit an existing address, with data automatically populated into the form for better user experience.

#### Delete:
Addresses can be removed with confirmation to prevent accidental deletion.

Default Address Handling:
Only one address can be set as the default at a time, reflecting real e-commerce business rules.



## Tech Stack
Frontend Framework: Vue 3 (Composition API)

Build Tool: Vite

UI Library: Element Plus

Language: JavaScript (ES6+)

State Management: Reactive state with Vue Composition API

Development Tools:
ESLint for code quality
Vue DevTools for debugging

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
