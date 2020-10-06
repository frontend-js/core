# Frontend-js Core
A simple, minimalist frontend framework.

## Options
```js
{
    name: 'component-name',
    template: '<div class="component-name">{{ hello }}</div>',
    data: {
        hello: 'Hello World'
    },
    styles: '',
    components: {}
}
```
- `root` - A DOM element to attach the component to.  Uses query selectors to append.
- `template` - A string template that is used to generate the component html.  Can include child components.
- `data` - Any values that the component may want to parse inside the template.
- `styles` - A stylesheet that will be converted to an inline style element when rendered.
- `components` - An object with child components to render into the template.
    ```js
    // index.js
    import Navigation from './components/navigation'
    import Footer from './components/footer'
    ...
    components: {
        'fjs-navigation': Navigation,
        Footer
    }
    ```
    Used like this in template:
    ```html
    <!-- component.html -->
    <div>
        <fjs-navigation />
        <Footer></Footer>
    </div>
    ```