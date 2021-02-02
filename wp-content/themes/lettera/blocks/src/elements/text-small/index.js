import {withSelect} from "@wordpress/data";
import {RichText} from "@wordpress/block-editor";
import classnames from "classnames";

import Icon from "../../global/icons";
import getInspectorControls from "../../controls/getInspectorControls";
import LetteraConfig from "../../global/config";

export const name = "lettera/text-small";

export const settings = {
    title: "Small text",
    icon: Icon.text,
    category: LetteraConfig.category,
    parent: LetteraConfig.childElemets.mainBlocks,
    attributes: {
        content: {
            type: "string",
            source: "html",
            selector: "p.text-small"
        },
        placeholder: {
            type: "string",
            default: "Text bellow button…"
        },
        addClass: {
            type: "string",
            default: ""
        }
    },
    edit: withSelect((select, blockData) => {

        const parentClientId = select("core/block-editor").getBlockHierarchyRootClientId(blockData.clientId);

        return {
            clientId: blockData.clientId,
            parentClientId,
            parentBlockAttributes: select("core/block-editor").getBlockAttributes(parentClientId)
        };

    })((props) => {

        const {
            attributes,
            setAttributes,
            parentClientId,
            parentBlockAttributes,
            className
        } = props;

        const {
            content,
            placeholder,
            addClass
        } = attributes;

        if (parentBlockAttributes.textColor === "white") {

            setAttributes({"addClass": "text-white"});

        } else {

            setAttributes({"addClass": "text-gray"});

        }

        const inspectorControls = getInspectorControls(parentClientId, parentBlockAttributes);

        return (
            <>
                {inspectorControls}
                <RichText
                    identifier="content"
                    tagName="p"
                    className={classnames(className, "text-small", addClass)}
                    onChange={(value) => setAttributes({"content": value})}
                    value={content}
                    placeholder={placeholder}
                    allowedFormats={[
                        "core/bold",
                        "core/italic",
                        "core/link"
                    ]}
                />
            </>
        );

    }),
    "save": (props) => {

        const {
            "attributes": {
                className,
                content,
                addClass
            }
        } = props;

        return (
            content && <RichText.Content
                tagName="p"
                value={ content }
                className={classnames(className, "text-small", addClass)}
            />
        );

    }

};
