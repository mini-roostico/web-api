import mongoose, {Model, Schema, Types} from "mongoose"

type Func = (...args: any[]) => any

export interface ISource {
    parameters?: Map<string, any>,
    macros?: Map<string, Func>,
    configurations?: Map<string, any[]>,
    user: Types.ObjectId,
}

interface SourceDocumentType extends Model<ISource> {
    getSourcesForUser(userId: Types.ObjectId): Promise<ISource[]>;
}

const Source = new Schema<ISource, SourceDocumentType>({
    parameters: {
        type: Map<string, any>,
        required: false,
    },
    macros: {
        type: Map<string, Func>,
        required: false,
    },
    configurations: {
        type: Map<string, any[]>,
        required: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
});

Source.static('getSourcesForUser', async function getSourcesForUser(userId: Types.ObjectId){
    return this.find({ user: userId }).lean().exec();
});

const SourceModel = mongoose.model<ISource, SourceDocumentType>("Source", Source);
export {SourceModel as Source};
