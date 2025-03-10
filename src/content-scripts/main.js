import { createApp } from "vue";
import Popup from "./Popup.vue";
import "@/styles/main.css";

const MOUNT_EL_ID = "as-automation-extension";

let mountEl = document.getElementById(MOUNT_EL_ID);
if (mountEl) {
  mountEl.innerHTML = "";
}
mountEl = document.createElement("div");
mountEl.setAttribute("id", MOUNT_EL_ID);
document.body.appendChild(mountEl);

const vm = createApp(Popup).mount(mountEl);
console.log("✅ Content script is running!");

chrome.runtime.onMessage.addListener(message => {
  console.log("message from background", message);

  console.log({ message });
  if (message.toggleVisible) {
    vm.visible = !vm.visible;
  }
});
