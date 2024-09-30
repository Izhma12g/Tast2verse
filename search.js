const input = document.querySelector('input[type="text"]')
let query;

input.addEventListener("keypress", function(event) {
    query = this.value.toLowerCase();
    if (event.key === "Enter") {
      document.getElementById("btn").click();
    }
});

function search() {
    window.location.replace('explore.htm?search=' + query);
}