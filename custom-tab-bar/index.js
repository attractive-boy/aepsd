import TabMenu from './data';
Component({
  data: {
    active: 0,
    list: TabMenu,
  },
  lifetimes: {
    attached() {
      this.init()
    }
  },

  methods: {
    onChange(event) {
      console.log(event)
      this.toPage(event);
    },
    toPage(event){
      const { value } = event.detail;
      const targetUrl = `/${this.data.list[value].url}`;

      wx.switchTab({
        url: targetUrl,
      });
    },

    init() {
      const page = getCurrentPages().pop();
      const route = page ? page.route.split('?')[0] : '';
      const active = this.data.list.findIndex(
        (item) => item.url === route
      );
      console.log("active==>", active);
      this.setData({ active });
    },
  },
});
