import { useStore } from './useStore.js';
import { _getContent, _makeHtml } from './utilities.js';

// Todo: accept element instead of element Id in methods!
// Todo: handle component visibility change, a method to hide or show a component

export default function ZEngine(parentElement) {
  // we will do something with the parent element
  let ZParent = parentElement;
  let eventsHandler;

  // define main state manager!
  const stateManager = (config) => {
    let initialState = config.initialState;
    let enableLocalStorage = config.persistStates;

    // intialize store and expose store methods
    const { store, setStore, getStoreValue, eventManager } = useStore(
      initialState,
      enableLocalStorage
    );

    // set state events handler
    eventsHandler = eventManager;

    // do more stuff with state like hooking in events

    return {
      state: store,
      setState: setStore,
      getState: getStoreValue,
    };
  };

  // logs whatever was rendered in broswer to console
  const log = () => {
    console.log('What is rendered by Z Framework:', ZParent);
  };

  // used function, arrow syntax was ambiguous here!
  function useEvent(eventName, callbackFn) {
    if (eventsHandler) {
      eventsHandler.addNewListener(eventName, callbackFn);
    }
  }

  // sets the page parent element explicitly
  const setParent = (parentElement) => {
    ZParent = parentElement;
  };

  // renders givent component into given element
  const render = (elementID, component) => {
    let newContent = _getContent(component);

    let element = document.getElementById(elementID);
    element.innerHTML = '';
    element.innerHTML = newContent;
  };

  // replaces given element with new component, - should remove old one!
  const replace = (elementID, component) => {
    let newContent = _getContent(component);

    let element = document.getElementById(elementID);
    element.innerHTML = '';
    element.innerHTML = newContent;
  };

  // appends an element to a given position in respect to passed in element
  const append = (order, elementID, component) => {
    let element = document.getElementById(elementID);

    let newContent = _getContent(component);

    if (order === 'after:') {
      element.appendChild(_makeHtml(newContent));
    } else {
      // append new content element to before the current in elements
    }
  };

  // shows a loader component for given duration
  const showLoader = (component, duration) => {
    let newContent = _getContent(component);
    let newContentHtml = _makeHtml(newContent);
    newContentHtml.classList.add('z-loader');
    ZParent.appendChild(newContentHtml);

    // remove element after given time
    setTimeout(() => {
      let target = document.querySelector('.z-loader');
      target.style.display = 'none';
    }, duration);
  };

  // try html templating
  const html = (component) => {
    let newContent = _getContent(component);
    return newContent;
  };

  // Z funtion exports exposed with Z.method syntax
  return {
    log,
    setParent,
    replace,
    append,
    render,
    showLoader,
    stateManager,
    useEvent,
    html,
  };
}
