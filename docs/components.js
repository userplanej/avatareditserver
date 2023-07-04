module.exports = {
  components: {
    schemas: {
      APIErrorResponse: {
        type: 'object',
        properties: {
          code: {
            type: 'number',
            example: 400,
            description: 'error code'
          },
          errors: {
            type: 'object',
            properties: {
              messages: {
                type: 'object',
                properties: {
                  field_name: {
                    type: 'array',
                    description: 'error by field_name',
                    items: {
                      type: 'string',
                      example: 'this field is required'
                    }
                  }
                }
              }
            },
            subcode: {
              type: 'integer',
              decription: 'Optional params, show more detail about problem'
            }
          }
        }
      },
      User: {
        type: 'object',
        properties: {
          user_id: {
            type: 'integer',
            example: 1
          },
          email: {
            type: 'string',
            example: 'test@test.com'
          },
          password: {
            type: 'string',
            example: 'test123TES!@#'
          },
          password_confirm: {
            type: 'string',
            example: 'test123TES!@#'
          },
          create_date: {
            type: 'string',
            format: 'date',
            example: '2021-09-08T00:00:00Z'
          },
          create_date: {
            type: 'string',
            format: 'date',
            example: '2021-09-08T00:00:00Z'
          }
        }
      },
      Organization: {
        type: 'object',
        properties: {
          organization_id: {
            type: 'integer',
            example: 1
          },
          organization_name: {
            type: 'string',
            example: 'test organization'
          },
          create_date: {
            type: 'string',
            format: 'date',
            example: '2021-09-08T00:00:00Z'
          },
          create_date: {
            type: 'string',
            format: 'date',
            example: '2021-09-08T00:00:00Z'
          }
        }
      },
      AvatarTemplate: {
        type: 'object',
        properties: {
          avatar_id: {
            type: 'integer',
            example: 1
          },
          avatar_name: {
            type: 'string',
            example: 'test avatar'
          },
          avatar_dir: {
            type: 'string',
            example: 'test avatar dir'
          },
          create_date: {
            type: 'string',
            format: 'date',
            example: '2021-09-08T00:00:00Z'
          },
          create_date: {
            type: 'string',
            format: 'date',
            example: '2021-09-08T00:00:00Z'
          }
        }
      },
      ImageClip: {
        type: 'object',
        properties: {
          clip_id: {
            type: 'integer',
            example: 1
          },
          package_id: {
            type: 'integer',
            example: 1
          },
          background_type: {
            type: 'string',
            example: 'video'
          },
          html5_script: {
            type: 'string',
            example: 'html script'
          },
          html5_dir: {
            type: 'string',
            example: 'html directory'
          },
          clip_name: {
            type: 'string',
            example: 'clip name'
          },
          create_date: {
            type: 'string',
            format: 'date',
            example: '2021-09-08T00:00:00Z'
          },
          create_date: {
            type: 'string',
            format: 'date',
            example: '2021-09-08T00:00:00Z'
          }
        }
      },
      ImageList: {
        type: 'object',
        properties: {
          image_id: {
            type: 'integer',
            example: 1
          },
          image_name: {
            type: 'string',
            example: 'test organization'
          },
          image_dir: {
            type: 'string',
            example: 'location from s3'
          },
          create_date: {
            type: 'string',
            format: 'date',
            example: '2021-09-08T00:00:00Z'
          },
          create_date: {
            type: 'string',
            format: 'date',
            example: '2021-09-08T00:00:00Z'
          }
        }
      },
      ImagePackage: {
        type: 'object',
        properties: {
          package_id: {
            type: 'integer',
            example: 1
          },
          clip_id: {
            type: 'integer',
            example: 1
          },
          user_id: {
            type: 'integer',
            example: 1
          },
          file_dir: {
            type: 'string',
            example: 'package directory'
          },
          create_date: {
            type: 'string',
            format: 'date',
            example: '2021-09-08T00:00:00Z'
          },
          create_date: {
            type: 'string',
            format: 'date',
            example: '2021-09-08T00:00:00Z'
          }
        }
      },
      Output: {
        type: 'object',
        properties: {
          video_id: {
            type: 'integer',
            example: 1
          },
          user_id: {
            type: 'integer',
            example: 1
          },
          video_name: {
            type: 'string',
            example: 'test video name'
          },
          video_dir: {
            type: 'string',
            example: 'package directory'
          },
          create_date: {
            type: 'string',
            format: 'date',
            example: '2021-09-08T00:00:00Z'
          },
          create_date: {
            type: 'string',
            format: 'date',
            example: '2021-09-08T00:00:00Z'
          }
        }
      },
      ShapeList: {
        type: 'object',
        properties: {
          shape_id: {
            type: 'integer',
            example: 1
          },
          shape_name: {
            type: 'string',
            example: 'test video name'
          },
          shape_dir: {
            type: 'string',
            example: 'package directory'
          },
          create_date: {
            type: 'string',
            format: 'date',
            example: '2021-09-08T00:00:00Z'
          },
          create_date: {
            type: 'string',
            format: 'date',
            example: '2021-09-08T00:00:00Z'
          }
        }
      },
      VideoList: {
        type: 'object',
        properties: {
          video_id: {
            type: 'integer',
            example: 1
          },
          video_name: {
            type: 'string',
            example: 'test video name'
          },
          video_dir: {
            type: 'string',
            example: 'package directory'
          },
          create_date: {
            type: 'string',
            format: 'date',
            example: '2021-09-08T00:00:00Z'
          },
          create_date: {
            type: 'string',
            format: 'date',
            example: '2021-09-08T00:00:00Z'
          }
        }
      },
    },
    
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    }
  }
};
