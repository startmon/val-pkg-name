import {z} from 'zod';

const projectNameValidator =  z
.string()
.min(1, "Package name cannot be empty")
.max(214, "Package name must be 214 characters or fewer")
.regex(/^[a-z0-9-_]+$/, "Only lowercase letters, numbers, dashes, and underscores are allowed")
.refine(
  (name) => !/^[-_]|[-_]$/.test(name),
  "Package name cannot start or end with a dash or underscore"
)
.refine(
  (name) => !['node_modules', 'favicon.ico'].includes(name),
  "This name is reserved and cannot be used"
);



export const validateProjectName = (name: string) => {
   const check = projectNameValidator.safeParse(name)

    if(check.success) {
         return {
            valid: true,
            name: check.data,
         }
    } else {
        return  {
            valid: false,
            error: check.error.errors[0].message
         }
    }
}