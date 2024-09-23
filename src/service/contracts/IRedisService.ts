export default interface IRedisService {
    getUserApiKey: (key: string) => Promise<boolean>;
    setUserByApiKey: (
        key: string,
        seconds: number,
        valueParam: string | object
    ) => Promise<boolean>;
}
