let dbInstance: any = null;

export const getDB = async () => {
    if (typeof window === 'undefined') return null;

    if (!dbInstance) {
        const { default: PouchDB } = await import('pouchdb-browser');
        const { default: PouchDBFind } = await import('pouchdb-find');

        PouchDB.plugin(PouchDBFind);
        dbInstance = new PouchDB('ceylonsky_fids');
    }

    return dbInstance;
};

export default getDB;
