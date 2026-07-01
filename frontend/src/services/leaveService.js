import api from './api';

const leaveService = {
  applyForLeave: async (leaveData) => {
    return await api.post('leaves/apply', leaveData);
  },
  // In the future, we will add more methods here like:
  // getMyLeaves: async () => { ... }
  // getPendingLeaves: async () => { ... } (Admin only)
  // updateLeaveStatus: async (id, status) => { ... } (Admin only)
};

export default leaveService;
