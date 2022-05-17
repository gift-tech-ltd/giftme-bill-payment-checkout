export function useFathomEvents(goal: string) {
    if ((window as any).fathom) {
        (window as any).fathom.trackGoal(goal, 0);
    } else {
        console.warn('Fathom is not loaded');
    }
}
