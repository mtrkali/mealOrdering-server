import { userService } from "./user.service";
const getAllUsers = async (req, res) => {
    try {
        const result = await userService.getAllUsers();
        res.status(201).json({
            message: "all user get success!!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong from getAllUsers controller",
            error: error.message,
        });
    }
};
const getSingleUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await userService.getSingleUser(userId);
        res.status(201).json({
            message: "single user get success!!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong from getSingleUser controller",
            error: error.message,
        });
    }
};
const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await userService.updateUser(userId, req.body);
        res.status(201).json({
            message: "user update success!!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong from updateUser controller",
            error: error.message,
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await userService.deleteUser(userId);
        res.status(201).json({
            message: "single user get success!!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong from deleteUser controller",
            error: error.message,
        });
    }
};
export const userController = {
    getAllUsers,
    updateUser,
    getSingleUser,
    deleteUser,
};
//# sourceMappingURL=user.controller.js.map