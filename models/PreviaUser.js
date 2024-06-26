import mongoose, { Schema, models } from "mongoose";

const PreviaUserSchema = new Schema(
    {
      previa_id: {
        type: String,
      },
      user_id: {
        type: String,
      },
    },
    { timestamps: true }
  );

const PreviaUser = models.PreviaUser || mongoose.model("PreviaUser", PreviaUserSchema);
export default PreviaUser;