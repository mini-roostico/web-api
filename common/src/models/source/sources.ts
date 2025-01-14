import mongoose, {Model, Schema, Types} from "mongoose"
import {AccessSource} from "./sources.access";

type Func = (...args: any[]) => any

export interface ISource {
    parameters?: Map<string, any>,
    macros?: Map<string, Func>,
    configurations?: Map<string, any[]>,
    user: Types.ObjectId,
    sourceAsString?: string,
}

interface SourceDocumentType extends Model<ISource> {
    getNotificationsForUser(userId: Types.ObjectId): Promise<ISource[]>;
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
    sourceAsString: {
        type: String,
        required: false,
    }
});

Source.static('getSourcesForUser', async function getSourcesForUser(userId: Types.ObjectId){
    const sourcesQueryPromise = this.find({
        $or: [
            { user: userId },
            { user: { $exists: false } }
        ]
    }).lean().exec();
    const accessSourceIdsPromise = AccessSource.find({ user: userId })
        .distinct('source')
        .exec();
    const [sources, accessSourcesIds] = await Promise.all([sourcesQueryPromise, accessSourceIdsPromise])
    const accessSourcesIdsString = accessSourcesIds.map(id => id.toString());
    return sources.filter(source => accessSourcesIdsString.includes(source._id.toString()));
});

const SourceModel = mongoose.model<ISource, SourceDocumentType>("Source", Source);
export {SourceModel as Source};
