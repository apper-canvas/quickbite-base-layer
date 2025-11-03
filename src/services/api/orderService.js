import ordersData from "@/services/mockData/orders.json";

const orderService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...ordersData];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const order = ordersData.find(o => o.Id === id);
    if (!order) {
      throw new Error("Order not found");
    }
    return { ...order };
  },

  async create(order) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newId = Math.max(...ordersData.map(o => o.Id)) + 1;
    const newOrder = {
      ...order,
      Id: newId,
      status: "confirmed",
      placedAt: new Date().toISOString(),
      paymentStatus: "completed"
    };
    ordersData.push(newOrder);
    return { ...newOrder };
  },

  async update(id, data) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = ordersData.findIndex(o => o.Id === id);
    if (index === -1) {
      throw new Error("Order not found");
    }
    ordersData[index] = { ...ordersData[index], ...data };
    return { ...ordersData[index] };
  },

  async updateStatus(id, status) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = ordersData.findIndex(o => o.Id === id);
    if (index === -1) {
      throw new Error("Order not found");
    }
    ordersData[index].status = status;
    if (status === "delivered") {
      ordersData[index].completedAt = new Date().toISOString();
    }
    return { ...ordersData[index] };
  },

  async cancel(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.updateStatus(id, "cancelled");
  },

  async getByUserId(userId) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return [...ordersData.filter(o => o.userId === userId)];
  },

  async getActiveOrders(userId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const activeStatuses = ["confirmed", "preparing", "out_for_delivery", "nearby"];
    return [...ordersData.filter(o => 
      o.userId === userId && activeStatuses.includes(o.status)
    )];
  },

  async rateOrder(id, rating, review = "") {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = ordersData.findIndex(o => o.Id === id);
    if (index === -1) {
      throw new Error("Order not found");
    }
    ordersData[index].rating = rating;
    ordersData[index].review = review;
    return { ...ordersData[index] };
  }
};

export default orderService;