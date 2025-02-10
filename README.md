# 📜 Parchment

I love little scrollspies, particularly `notion's`. While they're simple as anything, I wanted to make my own.

<img src="https://github.com/user-attachments/assets/b2ad4bbe-835e-4ea2-aac4-81d29b445158" width="150px" />

Parchment is a simple wee handful of headless components to help compose scrollable sections with visual indicators. No dependencies other than the usual `react`

<small>_Scroll_able... Parchment... 📜</small>

## Installation
```bash
npm install parchment
```

Done. No dependencies outside of `react` and `react-dom`.

## Usage
We're using React Context under the hood, so you'll need to wrap any parchment fellas with the `ParchmentProvider`.

```jsx
import { ParchmentProvider } from 'parchment';

return (
    <ParchmentProvider>
        {/* Your scrollable sections and their buttons here */}
    </ParchmentProvider>
);
```

## Parchment
The scroll, which will have sections that can be scrolled to. Can accept any `ReactNode` children.

```tsx
import { Parchment } from 'parchment';

interface ParchmentOptions {
    /**
     * Sets the intersection threshold for all parchment sections.
     *
     * @default 0.5
     */
    intersectionThreshold?: number;
    /**
     * Sets options for the `scrollIntoView` method, when a ParchmentButton is clicked.
     *
     * @default { behavior: 'smooth', block: 'center' }
     */
    scrollIntoViewOptions?: ScrollIntoViewOptions;
    /**
     * Whether to enable scroll-snapping on the parchment container.
     *
     * @default false
     */
    snap?: boolean;
}

return (
    <Parchment snap={true} scrollIntoViewOptions={{ block: 'start' }} intersectionThreshold={0.3}>
        {...sections}
    </Parchment>
)

```

## Sections
Any 'scrollable' sections should be wrapped in a `ParchmentSection` component. This will register the section with the context.

```jsx
import { Parchment, ParchmentSection } from 'parchment';

function MyScrollableSections() {
    return (
        <Parchment>
            <ParchmentSection section="my-section">
                {/* Your content here */}
            </ParchmentSection>
        </Parchment>
    );
}
```

## Buttons
Parchment buttons are wired up to know when their associated section is in view. An 'active' class is
applied to the button, or passed as a boolean argument to a function.

### .active class
```jsx
import ParchmentButton from 'parchment';

/*
 * .parchment-button.active {
 *      color: rebeccapurple;
 * }
 */
function MyButton() {
  return (
    <ParchmentButton section="my-section">
        My Section Name
    </ParchmentButton>
  );
}
```

### active argument
```jsx
/**
 * If the `ParchmentButton` child is a function, it is called
 * with a boolean reflecting whether the section is in view.
 */
function MyButton() {
  return (
    <ParchmentButton section="my-section">
        {(active) => (
            <div style={{ color: active ? 'rebeccapurple' : 'blue' }}>
                My Section Name
            </div>
        )}
    </ParchmentButton> 
  );
}
```

So, at the end of the day, we're up and away with the following:

```jsx
import { Parchment, ParchmentSection, ParchmentButton } from 'parchment';

function MyScrollableSections() {
    return (
        <ParchmentProvider>
            <ParchmentButton section="my-section">
                My Section Name
            </ParchmentButton>
            <Parchment>
                <ParchmentSection section="my-section">
                    {/* Your content here */}
                </ParchmentSection>
            </Parchment>
        </ParchmentProvider>
    );
}
```

## Other APIS
### `useParchment`

The `useParchment` hook provides a few useful functions for interacting with the Parchment context.

#### `scrollTo`
Uses the window's native `scrollIntoView` method to scroll to a section by key, but with options loaded in the parchment context.

#### `inView`
Returns the key of the section currently in viewport, e.g.:

```jsx
import { useParchment } from 'parchment';

function MyComponent() {
    const { scrollTo, inView } = useParchment();

    console.log(inView); // 'my-section'

    return (
        <button onClick={() => scrollTo('my-section')}>
            Scroll to my section
        </button>
    );
}
```

#### ScrollOptions
`Parchment` accepts the global [`ScrollIntoViewOptions`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView#scrollintoviewoptions) object as a `prop`.

## Contributions
Feel free to contribute. Has the default vite scripts, so to get up and running after cloning just run `npm run dev`.

## TODO:
- [ ] Add tests
- [ ] Add more features
- [ ] Add horizontal/vertical option
- [ ] Add `asChild` prop to `ParchmentButton` to allow for custom components
- [ ] Add `threshold` prop to `ParchmentButton` to allow for custom scroll thresholds
- [ ] Add `percentInView` option?
