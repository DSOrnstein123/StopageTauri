// export const WorkbenchSnapshot = {
//   captureState() {
//     return {
//       tabs: [...this.tabs.values()].map((tab) => tab.captureState()),
//       activeTabId: this.activeTabId,
//     };
//   },

//   restoreState() {
//     this.tabs.clear();
//     this.getStore().setState({ activeTabId: null });

//     const rawSnapshot = localStorage.getItem("workspace-snapshot");
//     if (rawSnapshot) {
//       try {
//         const snapshot = JSON.parse(rawSnapshot) as WorkspaceSnapshot;

//         this.getStore().setState({ activeTabId: snapshot.state.activeTabId });
//         snapshot.state.tabs.forEach((tab) => {
//           const tabInstance = Tab.restore(this.host, tab.id, tab.currentEntry);
//           this.tabs.set(tab.id, tabInstance);
//         });
//         this.host.applyLayout(snapshot.layout);
//       } catch (error) {
//         this.host.loadDefaultLayout();
//         console.error("Failed to load snapshot:", error);
//       }
//     } else {
//       this.host.loadDefaultLayout();
//     }
//   },
// };
