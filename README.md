# 📜 Parchment

Parchment is a simple handful of headless components for element scroll with visible feedback, using the IntersectionObserver API.


## Buttons
Parchment buttons are wired up to know when their associated section is in view. An 'active' class is
applied to the button, or passed as a boolean argument to a function.

You can use their active state in two ways:

### .active class
```jsx
import ParchmentButton from 'parchment';
import { mySectionKey } from './some-config';

/*
 * .parchment-button.active {
 *      color: rebeccapurple;
 * }
 */
function MyButton() {
  return (
    <ParchmentButton section={mySectionKey}>
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
    <ParchmentButton section={mySectionKey}>
        {(active) => (
            <div style={{ color: active ? 'rebeccapurple' : 'blue' }}>
                My Section Name
            </div>
        )}
    </ParchmentButton> 
  );
}
```

TODO add:

Docs

memoise context, test memoise context values?
API

- scrollTo,
- inView,
- etc...
- make scrollTo configurable (e.g. start, center, end)