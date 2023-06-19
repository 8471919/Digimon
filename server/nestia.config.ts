// nestia configuration file
import type sdk from '@nestia/sdk';

const NESTIA_CONFIG: sdk.INestiaConfig = {
  /**
   * List of files or directories containing the NestJS controller classes.
   */
  input: 'src/**/*.controller.ts',
  /**
   * Output directory that SDK would be placed in.
   *
   * If not configured, you can't build the SDK library.
   */
  output: 'src/api',

  /**
   * Building `swagger.json` is also possible.
   *
   * If not specified, you can't build the `swagger.json`.
   */
  swagger: {
    /**
     * Output path of the `swagger.json`.
     *
     * If you've configured only directory, the file name would be the `swagger.json`.
     * Otherwise you've configured the full path with file name and extension, the
     * `swagger.json` file would be renamed to it.
     */
    output: 'dist/swagger.json',
    /**
     * List of server addresses.
     */
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Server',
      },
    ],
    /**
     * Security schemes.
     */
    security: {
      bearer: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Authorization',
      },
    },
  },
  /**
   * Whether to wrap DTO by primitive type.
   *
   * If you don't configure this property as `false`, all of DTOs in the
   * SDK library would be automatically wrapped by {@link Primitive} type.
   *
   * For refenrece, if a DTO type be capsuled by the {@link Primitive} type,
   * all of methods in the DTO type would be automatically erased. Also, if
   * the DTO has a `toJSON()` method, the DTO type would be automatically
   * converted to return type of the `toJSON()` method.
   *
   * @default true
   */
  primitive: false,
};
export default NESTIA_CONFIG;
