let app = new Vue({
  el:'#main-content',
  data: {
    dataColor:""
  },
  methods: {
            mouseLeave: function(value) {
              document.querySelector("#main-content").classList.remove(value);
            },
            mouseEnter: function(value) {
              document.querySelector("#main-content").classList.add(value);
            }
  }
})
