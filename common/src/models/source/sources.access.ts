import mongoose, {Model, Schema, Types} from "mongoose"

export interface IAccessSource{
    user: Types.ObjectId,
    source: Types.ObjectId
}

type AccessSourceDocumentType = Model<IAccessSource>
const AccessSource = new Schema<IAccessSource, AccessSourceDocumentType>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    source: {
        type: Schema.Types.ObjectId,
        ref: "Source",
        required: true,
    }
});

AccessSource.index({ user: 1, source: 1 }, { unique: true });

const AccessSourceModel = mongoose.model<IAccessSource>("AccessSource", AccessSource);
export {AccessSourceModel as AccessSource};