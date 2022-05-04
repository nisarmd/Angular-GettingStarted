Angular modules allow modularization in an enterprise application codebase.
    - Maintainable/Readable code
    - Better encapsulation for components/directives and pipes
    - The key is to have business module  specific Angular module class created with annotation @NgModule().
        - There can be only one component that can be bootstraped by base module(app.module.ts) no other feature module (eg. product.module.ts) must have bootstrap property defined.

        - Move feature specific Components/Pipes & Directives to respective feature module's declaration:[] & imoprts:[] sections.

        - To make a module sharale across other module, one can create a shared.module.ts and within that can have dependencies for imorts:[] and declaration:[] which is specific to that shared module.
                But can also contain a property exports:[ FormsModule, CommonModule, SharedComponent1 ]. And place all the components/directives/pipes and third party imports defined in exports so that they are GLOBALLY available in the application.
        - feature modules eg. feature1.module.ts must add an import for shared.module.ts
        - Also any base module eg. app.module.ts must import any other feature modules in imports:[]

            Example - 

                ng g m shared/shared --flat -m products/product

                Explainaion:-
                ng -    angular cli
                g -     generate
                m -     module shared/shared - create under folder shared a file named shared.module.ts
                --flat - create direct files in the directory without creating any flders
                -m - include/import in module under products folder product.module.ts

