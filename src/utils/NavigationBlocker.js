// import { useEffect, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const NavigationBlocker = ({ blockPath = '/book' }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isPromptingRef = useRef(false); // Prevents multiple prompts
//   const lastLocationRef = useRef(location); // Tracks current location
//   const isBlockedRef = useRef(false); // Tracks if blocking is active

//   // Check if on the blockPath (ignoring query params)
//   const isOnBlockPath = location.pathname === blockPath;

//   // Update last known location
//   useEffect(() => {
//     lastLocationRef.current = location;
//     isBlockedRef.current = isOnBlockPath;
//   }, [location, isOnBlockPath]);

//   // Handle navigation attempts
//   useEffect(() => {
//     // Skip if not on blockPath
//     if (!isOnBlockPath) return;

//     // Push a custom history state to mark the current position
//     const blockerState = { blocker: 'active', timestamp: Date.now() };
//     window.history.pushState(blockerState, '', location.pathname + location.search);

//     // Handle popstate for back/forward and touchpad swipes
//     const handlePopState = (event) => {
//       if (!isBlockedRef.current || isPromptingRef.current) return;

//       // If the state is our blocker state, do nothing (prevents loop)
//       if (event.state?.blocker === 'active') return;

//       isPromptingRef.current = true;
//       const shouldNavigate = window.confirm(
//         'Are you sure you want to leave this page? Changes may not be saved.'
//       );

//       if (shouldNavigate) {
//         console.log('User confirmed back/forward navigation');
//         isPromptingRef.current = false;
//       } else {
//         // Restore current location
//         window.history.pushState(
//           blockerState,
//           '',
//           lastLocationRef.current.pathname + lastLocationRef.current.search
//         );
//         navigate(lastLocationRef.current.pathname + lastLocationRef.current.search, {
//           replace: true,
//         });
//         isPromptingRef.current = false;
//       }
//     };

//     // Wrap history methods to catch Link and programmatic navigation
//     const originalPushState = window.history.pushState;
//     const originalReplaceState = window.history.replaceState;

//     window.history.pushState = function (data, title, url) {
//       if (!isBlockedRef.current || isPromptingRef.current) {
//         originalPushState.apply(window.history, [data, title, url]);
//         return;
//       }

//       // Skip if navigating to the same URL (e.g., refresh or same-page action)
//       if (url === lastLocationRef.current.pathname + lastLocationRef.current.search) {
//         originalPushState.apply(window.history, [data, title, url]);
//         return;
//       }

//       isPromptingRef.current = true;
//       const shouldNavigate = window.confirm(
//         'Are you sure you want to leave this page? Changes may not be saved.'
//       );

//       if (shouldNavigate) {
//         console.log('User confirmed navigation to:', url);
//         originalPushState.apply(window.history, [data, title, url]);
//         isPromptingRef.current = false;
//       } else {
//         // Restore current location
//         window.history.pushState(
//           blockerState,
//           '',
//           lastLocationRef.current.pathname + lastLocationRef.current.search
//         );
//         navigate(lastLocationRef.current.pathname + lastLocationRef.current.search, {
//           replace: true,
//         });
//         isPromptingRef.current = false;
//       }
//     };

//     window.history.replaceState = function (data, title, url) {
//       if (!isBlockedRef.current || isPromptingRef.current) {
//         originalReplaceState.apply(window.history, [data, title, url]);
//         return;
//       }

//       // Skip if replacing with the same URL
//       if (url === lastLocationRef.current.pathname + lastLocationRef.current.search) {
//         originalReplaceState.apply(window.history, [data, title, url]);
//         return;
//       }

//       isPromptingRef.current = true;
//       const shouldNavigate = window.confirm(
//         'Are you sure you want to leave this page? Changes may not be saved.'
//       );

//       if (shouldNavigate) {
//         console.log('User confirmed navigation to:', url);
//         originalReplaceState.apply(window.history, [data, title, url]);
//         isPromptingRef.current = false;
//       } else {
//         // Restore current location
//         window.history.pushState(
//           blockerState,
//           '',
//           lastLocationRef.current.pathname + lastLocationRef.current.search
//         );
//         navigate(lastLocationRef.current.pathname + lastLocationRef.current.search, {
//           replace: true,
//         });
//         isPromptingRef.current = false;
//       }
//     };

//     window.addEventListener('popstate', handlePopState);

//     return () => {
//       window.history.pushState = originalPushState;
//       window.history.replaceState = originalReplaceState;
//       window.removeEventListener('popstate', handlePopState);
//     };
//   }, [isOnBlockPath, navigate]);

//   // Allow refresh without prompt
//   useEffect(() => {
//     const handleBeforeUnload = (event) => {
//       // Do nothing to allow refresh
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//     };
//   }, []);

//   return null;
// };

// export default NavigationBlocker;


import { createContext, useContext, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Create a context for bypassing navigation
const NavigationBlockerContext = createContext({
  bypassNavigation: () => {},
});

export const useNavigationBlocker = () => useContext(NavigationBlockerContext);

const NavigationBlocker = ({ blockPath = '/book' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isPromptingRef = useRef(false); // Prevents multiple prompts
  const isBlockedRef = useRef(false); // Tracks if blocking is active
  const lastLocationRef = useRef(location); // Tracks current location
  const bypassRef = useRef(false); // Allows bypassing the prompt

  // Check if on the blockPath (ignoring query params)
  const isOnBlockPath = location.pathname === blockPath;

  // Update last known location
  useEffect(() => {
    lastLocationRef.current = location;
    isBlockedRef.current = isOnBlockPath;
  }, [location, isOnBlockPath]);

  // Bypass navigation function
  const bypassNavigation = (to) => {
    bypassRef.current = true;
    console.log('Bypassing navigation block to:', to);
    navigate(to);
    bypassRef.current = false;
  };

  // Handle navigation attempts
  useEffect(() => {
    if (!isOnBlockPath) return;

    // Push a custom history state to mark the current position
    const blockerState = { blocker: 'active', timestamp: Date.now() };
    window.history.pushState(blockerState, '', location.pathname + location.search);

    // Handle popstate for back/forward and touchpad swipes
    const handlePopState = (event) => {
      if (!isBlockedRef.current || isPromptingRef.current || bypassRef.current) return;

      // If the state is our blocker state, do nothing (prevents loop)
      if (event.state?.blocker === 'active') return;

      isPromptingRef.current = true;
      const shouldNavigate = window.confirm(
        'Are you sure you want to leave this page? Changes may not be saved.'
      );

      if (shouldNavigate) {
        console.log('User confirmed back/forward navigation');
        isPromptingRef.current = false;
      } else {
        // Restore current location
        window.history.pushState(
          blockerState,
          '',
          lastLocationRef.current.pathname + lastLocationRef.current.search
        );
        navigate(lastLocationRef.current.pathname + lastLocationRef.current.search, {
          replace: true,
        });
        isPromptingRef.current = false;
      }
    };

    // Wrap history methods to catch Link and programmatic navigation
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (data, title, url) {
      if (!isBlockedRef.current || isPromptingRef.current || bypassRef.current) {
        originalPushState.apply(window.history, [data, title, url]);
        return;
      }

      // Skip if navigating to the same URL (e.g., refresh or same-page action)
      if (url === lastLocationRef.current.pathname + lastLocationRef.current.search) {
        originalPushState.apply(window.history, [data, title, url]);
        return;
      }

      isPromptingRef.current = true;
      const shouldNavigate = window.confirm(
        'Are you sure you want to leave this page? Changes may not be saved.'
      );

      if (shouldNavigate) {
        console.log('User confirmed navigation to:', url);
        originalPushState.apply(window.history, [data, title, url]);
        isPromptingRef.current = false;
      } else {
        // Restore current location
        window.history.pushState(
          blockerState,
          '',
          lastLocationRef.current.pathname + lastLocationRef.current.search
        );
        navigate(lastLocationRef.current.pathname + lastLocationRef.current.search, {
          replace: true,
        });
        isPromptingRef.current = false;
      }
    };

    window.history.replaceState = function (data, title, url) {
      if (!isBlockedRef.current || isPromptingRef.current || bypassRef.current) {
        originalReplaceState.apply(window.history, [data, title, url]);
        return;
      }

      // Skip if replacing with the same URL
      if (url === lastLocationRef.current.pathname + lastLocationRef.current.search) {
        originalReplaceState.apply(window.history, [data, title, url]);
        return;
      }

      isPromptingRef.current = true;
      const shouldNavigate = window.confirm(
        'Are you sure you want to leave this page? Changes may not be saved.'
      );

      if (shouldNavigate) {
        console.log('User confirmed navigation to:', url);
        originalReplaceState.apply(window.history, [data, title, url]);
        isPromptingRef.current = false;
      } else {
        // Restore current location
        window.history.pushState(
          blockerState,
          '',
          lastLocationRef.current.pathname + lastLocationRef.current.search
        );
        navigate(lastLocationRef.current.pathname + lastLocationRef.current.search, {
          replace: true,
        });
        isPromptingRef.current = false;
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOnBlockPath, navigate]);

  // Allow refresh without prompt
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Do nothing to allow refresh
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <NavigationBlockerContext.Provider value={{ bypassNavigation }}>
      {null}
    </NavigationBlockerContext.Provider>
  );
};

export default NavigationBlocker;